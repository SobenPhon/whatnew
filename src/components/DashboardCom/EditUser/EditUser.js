import { useEffect, useState } from "react"
import { EditUserStyle } from "./EditUser.styled"
import { useAuthContext } from "../../../hook/useAuthContext"
import { dehydrate, useMutation, useQueryClient } from '@tanstack/react-query'
import { MsgModal } from "../../MsgModal/MsgModal"

import { storage } from "../../../firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useFetchAsset } from '../../../hook/useFetchAsset'
import { baseURL } from "../../../config"
import { VscEye } from 'react-icons/vsc'
import { VscEyeClosed } from 'react-icons/vsc'

export const EditUser = ({ data, handleCloseEdit }) => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()

  const [firstName, setFirstName] = useState(data?.firstName)
  const [lastName, setLastName] = useState(data?.lastName)
  const [username, setUsername] = useState(data?.username)
  const [email, setEmail] = useState(data?.email)
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(data?.role.toLowerCase())
  const [profile, setProfile] = useState(data?.profile)
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState()

  const [imgUpload, setImgUpload] = useState()
  const [imgUrl, setImgUrl] = useState('')
  const [percent, setPercent] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { data: roles, isLoading: isRolesLoading, error: rolesError } = useFetchAsset('/api/roles', '')

  useEffect(() => {
    // send decrypt request
    const dcryptPassword = async () => {
      const response = await fetch(`${baseURL}/api/dcryptpassword`, {
        method: "POST",
        body: JSON.stringify({ password: data.password }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      })

      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        console.log('json error: ', json.error)
      }

      if (response.ok) {
        setError(null)
        setPassword(json)
      }
    }
    dcryptPassword()
  }, [data.password])

  const loadFileandUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true)
      setImgUpload(e.target.files[0])

      // Upload image to database and retreive its link
      const imageFile = e.target.files[0]
      if (imageFile == null) return

      const uniqueName = new Date().getTime() + imageFile.name

      const imageRef = ref(storage, `user-images/${uniqueName}`)

      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress.toFixed(2) + '% done')
          setPercent(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File uploaded: ', downloadURL)
            setImgUrl(downloadURL)
            setUploading(false)
          })
        }
      )
    }
  }

  const saveMutation = useMutation({
    mutationFn: async (editUser) => {
      const response = await fetch(`${baseURL}/api/users/${data._id}`, {
        method: "PATCH",
        body: JSON.stringify(editUser),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      })

      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        console.log('json error: ', json.error)
      }

      if (response.ok) {
        setError(null)
        setMsg('????????????????????????????????????????????????????????????????????????')
        return json
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleSave = () => {
    saveMutation.mutate({ firstName, lastName, username, email, password, role, profile: imgUrl ? imgUrl : profile })
  }

  return (
    <EditUserStyle>
      {!msg && (
        <div className="edit-cat-container">
          <h2 className="title">???????????????????????????????????????????????????????????????</h2>

          <form className="user-form">
            <div className="upload-area form-group">
              <label className="imgLabel input-label" htmlFor="">??????????????????</label>
              <div className="upload-icon">
                <input
                  type="file"
                  id='img-input'
                  className='imgInput'
                  accept='image/*'
                  onChange={loadFileandUpload} />
                <label
                  className='btn-upload'
                  htmlFor="img-input">
                  {!imgUpload && (
                    <img
                      className='profile-preview'
                      src={profile}
                      alt={data.username} />
                  )}
                  {imgUpload && (
                    <img
                      className='profile-preview'
                      src={URL.createObjectURL(imgUpload)}
                      alt={imgUpload.name} />
                  )}
                </label>

                <div className="right-control">
                  <label htmlFor="img-input" className="btn-change-profile">???????????????????????????????????????????????????</label>

                  {imgUpload && (
                    <p className="upload-state">{percent?.toFixed() + '%'}</p>
                  )}

                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="firstName" className="input-label">??????????????????</label>
              <input type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control" id="firstName" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="input-label">?????????</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control" id="lastName" />
            </div>

            <div className="form-group">
              <label htmlFor="username" className="input-label">?????????????????????????????????????????????</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                id="username"
                autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="input-label">?????????????????????</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="email"
                autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="input-label">????????????????????????????????????</label>
              <div className="password-area">
                <input
                  type={!showPassword ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="password"
                  autoComplete="off" />
                <div className="btn-show-password" onClick={() => setShowPassword(!showPassword)}>{!showPassword ? <VscEye /> : <VscEyeClosed />}</div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role" className="input-label">??????????????????</label>
              <select value={role} className="form-control user-roles" onChange={(e) => {
                setRole(e.target.value)
              }}>
                {!isRolesLoading ? roles?.map(row => (
                  <option value={row.role} key={row._id}>{row.role}</option>
                )) : <option>Loading...</option>}
              </select>
            </div>
          </form>

          {error && <p className="input-msg">{error}</p>}

          <div className="btn">
            <button onClick={handleCloseEdit} className="btnCancel">??????????????????</button>
            <button disabled={uploading} onClick={handleSave} className="btnSave">????????????????????????</button>
          </div>
        </div>
      )}

      {msg && <MsgModal msg={msg} handleClose={handleCloseEdit} />}
    </EditUserStyle>
  )
}
