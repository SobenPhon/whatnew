import { useState } from "react"
import { EditUserStyle } from "./EditUser.styled"
import { useAuthContext } from "../../../hook/useAuthContext"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MsgModal } from "../../MsgModal/MsgModal"

import { storage } from "../../../firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useFetchAsset } from '../../../hook/useFetchAsset'
import { baseURL } from "../../../config"

export const EditUser = ({ data, handleCloseEdit }) => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()

  const [firstName, setFirstName] = useState(data?.firstName)
  const [lastName, setLastName] = useState(data?.lastName)
  const [username, setUsername] = useState(data?.username)
  const [email, setEmail] = useState(data?.email)
  const [password, setPassword] = useState(data?.password)
  const [role, setRole] = useState(data?.role.toLowerCase())
  const [profile, setProfile] = useState(data?.profile)
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState()

  const [imgUpload, setImgUpload] = useState()
  const [imgUrl, setImgUrl] = useState('')
  const [percent, setPercent] = useState(null)
  const [uploading, setUploading] = useState(false)

  const { data: roles, isLoading: isRolesLoading, error: rolesError } = useFetchAsset('/api/roles', '')

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
        setMsg('បានធ្វើបច្ចុប្បភាពជោគជ័យ')
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
          <h2 className="title">ព័ត៌មានអ្នកប្រើប្រាស់</h2>

          <form className="user-form">
            <div className="upload-area form-group">
              <label className="imgLabel" htmlFor="">រូបភាព</label>
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
                  <label htmlFor="img-input" className="btn-change-profile">ផ្លាស់ប្តូររូបភាព</label>

                  {imgUpload && (
                    <p className="upload-state">{percent?.toFixed() + '%'}</p>
                  )}

                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">ត្រកូល</label>
              <input type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control" id="firstName" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">នាម</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control" id="lastName" />
            </div>

            <div className="form-group">
              <label htmlFor="username">ឈ្មោះប្រើប្រាស់</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                id="username"
                autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="email">អ៉ីម៉ែល</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="email"
                autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="password">ពាក្យសម្ងាត់</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="password"
                autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="role">តួនាទី</label>
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
            <button onClick={handleCloseEdit} className="btnCancel">ចាកចេញ</button>
            <button disabled={uploading} onClick={handleSave} className="btnSave">រក្សាទុក</button>
          </div>
        </div>
      )}

      {msg && <MsgModal msg={msg} handleClose={handleCloseEdit} />}
    </EditUserStyle>
  )
}
