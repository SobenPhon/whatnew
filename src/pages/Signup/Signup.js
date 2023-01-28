import { SignupStyle } from "./Signup.styled"
import { useState } from "react"
import { useSignup } from '../../hook/useSignup'
import { useFetchAsset } from "../../hook/useFetchAsset"

import { storage } from "../../firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { FaCloudUploadAlt } from 'react-icons/fa'
import { BtnBack } from "../../components/BtnBack/BtnBack"

export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Author')

  const [profile, setProfile] = useState()
  const [imgUrl, setImgUrl] = useState('')
  const [percent, setPercent] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [clicked, setClicked] = useState('')

  const { signup, error } = useSignup()

  const { data: roles, isLoading: isRolesLoading, error: rolesError } = useFetchAsset('/api/roles', '')

  const loadFileandUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true)
      setProfile(e.target.files[0])

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (clicked === 'btnSubmit') {
      await signup(firstName, lastName, username, email, password, role, imgUrl)
    }
  }

  return (
    <SignupStyle>
      <div className="action-menu">
        <BtnBack onClick={() => setClicked('btnBack')} />
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-area">
          <div className="head-area">
            <div className="text-area">
              <h1 className="title">បង្កើតអ្នកប្រើប្រាស់ថ្មី</h1>
            </div>
          </div>

          <div className="name">
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

          {error && <div className="error">{error}</div>}
        </div>

        <div className="right-container">
          <div className="upload-area">
            <div className="btn-and-img">
              <input
                type="file"
                id='imgFile'
                className='imgInput'
                accept='image/*'
                onChange={loadFileandUpload} />
              <label
                className='btn-upload'
                htmlFor="imgFile">
                <p><FaCloudUploadAlt /></p>
                <p className="upload-text">Upload Profile</p>
                <div className="progress-bar" style={{ width: percent?.toFixed() + '%' }} percentage={percent?.toFixed()}></div>
              </label>

              {profile && percent === 100 && (
                <img
                  className='profile-preview'
                  src={URL.createObjectURL(profile)}
                  alt="profile" />
              )}
            </div>

            {percent === 100 && (
              <div className="file-info">
                <p className='fileSize'>Size: {(profile?.size / 1000000).toFixed(2)} MB</p>
                <p className="fileName">File: {profile?.name}</p>
              </div>
            )}
          </div>

          <div className="btn-right">
            <button
              disabled={uploading}
              className='btn-submit'
              onClick={() => setClicked('btnSubmit')}
            >
              បង្កើតគណនី
            </button>
          </div>
        </div>

      </form>
    </SignupStyle>
  )
}
