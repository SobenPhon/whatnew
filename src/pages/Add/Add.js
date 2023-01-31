import { useState, useEffect } from 'react'
import { AddStyle } from './AddStyled'
import { usePostContext } from '../../hook/usePostContext'
import { v4 } from 'uuid'
import { useAuthContext } from '../../hook/useAuthContext'
import useAuth from '../../hook/useAuth'
import { baseURL } from '../../config'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
import { MdClear } from 'react-icons/md'
import { CgEnter } from 'react-icons/cg'
import { RiDraftFill } from 'react-icons/ri'
import { TextEditor } from '../../components/TextEditor/TextEditor'
import { Markup } from 'interweave'
import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { BtnBack } from '../../components/BtnBack/BtnBack'

export const Add = () => {
  const { dispatch } = usePostContext()
  const [users, setUsers] = useState([])

  const { user } = useAuthContext()
  const { isAdmin, isEditor, userId } = useAuth()

  const [error, setError] = useState(null)
  const [message, setMessage] = useState()
  const [alertVisible, setAlertVisible] = useState(false)
  const [categories, setCategories] = useState([])

  // form data
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [authorId, setAuthorId] = useState(userId)
  const [selectedCat, setSelectedCat] = useState([])
  const [selectedUser, setSelectedUser] = useState(user.username)

  const [thumbnail, setThumbnail] = useState(null)
  const [image] = useState('https://peacehumanity.org/wp-content/uploads/2021/11/placeholder-54.png')
  const [imgUrl, setImgUrl] = useState('')
  const [percent, setPercent] = useState(null)

  const [clicked, setClicked] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${baseURL}/api/categories`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      })
      const data = await res.json()

      if (!res.ok) {
        console.error('something went wrong!')
      }

      if (res.ok) {
        setCategories(data)
      }
    }
    user && fetchCategories()

    // TODO: fetch by role that login
    const fetchUser = async () => {
      const res = await fetch(`${baseURL}/api/users/view`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      })
      const data = await res.json()

      if (!res.ok) {
        console.error('something went wrong!')
      }

      if (res.ok) {
        setUsers(data)
      }
    }
    user && fetchUser()
  }, [user, isAdmin, isEditor])

  const loadFileandUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true)
      setThumbnail(e.target.files[0])

      // Upload image to database and retreive its link
      const imageFile = e.target.files[0]
      if (imageFile == null) return

      // const uniqueName = new Date().getTime() + imageFile.name
      const imageName = imageFile.name + v4()

      const imageRef = ref(storage, `images/${imageName}`)

      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress.toFixed(2) + '% done')
          setPercent(progress)
          switch (snapshot.state) {
            case 'paused':
              // console.log('Upload is paused')
              break
            case 'running':
              // console.log('Upload is running')
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
            setImgUrl(downloadURL)
            setUploading(false)
          })
        }
      )
    }
  }

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target
    let tempCat = categories.map(cat => {
      if (cat.catName === value) {
        if (checked) {
          setSelectedCat(preCat => [...preCat, value])
        } else {
          setSelectedCat(selectedCat.filter(scat => scat !== value))
        }
        return { ...cat, isChecked: checked }
      } else {
        return cat
      }
    })
    setCategories(tempCat)
  }

  const handleAuthorChange = (e) => {
    setSelectedUser(e.target.value)
    const [selectUser] = users?.filter(u => u.username === e.target.value)
    setAuthorId(selectUser._id)
  }

  // add doc to server
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (clicked === 'btnSubmit') {
      if (!user) {
        setError('You must be logged in!')
        return
      }
      setMessage('')

      const post = {
        title,
        description: value,
        author: selectedUser,
        category: selectedCat,
        image: imgUrl,
        user_id: authorId
      }

      const response = await fetch(`${baseURL}/api/posts`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
        setAlertVisible(true)
        console.log(data.error)
      }

      if (response.ok) {
        console.log('new post added')
        setTitle('')
        setValue('')
        setError(null)
        setMessage('Post successfully added')
        setAlertVisible(true)
        dispatch({ type: 'CREATE_POSTS', payload: data })

        let tempCat = categories.map(cat => {
          return { ...cat, isChecked: false }
        })
        setCategories(tempCat)

        setTimeout(() => {
          setAlertVisible(false)
        }, 3000);
      }
    } else if (clicked === 'btnDraft') {
      console.log('Btn Draft clicked')
    }
  }

  return (
    <AddStyle onSubmit={handleSubmit}>
      <div className="action-menu mb-1">
        <BtnBack onClick={() => setClicked('btnBack')} />
      </div>

      <div className="editing">
        {/* Editor */}
        <div className="edit-area">
          {/* Message */}
          <div className="alertMessage">
            {(message && alertVisible) && <div className="message"><MdDone /> {message}</div>}
            {error && <div className='error'><MdClear /> {error}</div>}
          </div>

          <h1 className='main-heading'>សរសេរអត្ថបទថ្មី</h1>
          <div className="form-group">
            <label>ចំណងជើងអត្ថបទ</label>
            <input
              type="text"
              className='post-title form-control'
              placeholder='title'
              value={title}
              onChange={e => {
                setTitle(e.target.value)
              }}
            />
          </div>

          <TextEditor value={value} setValue={setValue} />

          {/* Live Update */}
          {(title || value || (selectedCat.length > 0) || imgUrl) && (
            <div className="live-preview">
              {title && <h1 className='title'>Title: <span>{title}</span></h1>}
              {(selectedCat.length > 0) && <p className='category'>Category: {selectedCat}</p>}
              {title && <p className='author'>Author: {selectedUser}</p>}
              {value && (
                <div className="description">
                  <Markup content={value} />
                </div>
              )}
              {imgUrl && (
                <>
                  <p className='image-link'>Image link: <a target='_blank' rel="noreferrer" href={image}>{image}</a></p>
                  <img className='image-preview' src={thumbnail ? URL.createObjectURL(thumbnail) : image} alt={title} />
                </>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="setting">
          <div className="btn-group">
            <button
              onClick={() => setClicked('btnDraft')}
              disabled={percent !== null && percent < 100}
              className='btn-draft icon-align'><RiDraftFill /> Draft</button>
            <button
              disabled={uploading}
              className='btn-submit icon-align'
              onClick={() => setClicked('btnSubmit')}><CgEnter /> Publish</button>
          </div>

          <h1 className='main-heading'>ការកំណត់</h1>
          <div className="author-select">
            <h3 className='sub-heading author-title'>អ្នកសរសេរ:</h3>
            <div className="form-group">
              <select
                value={selectedUser}
                className='post-author form-control'
                onChange={handleAuthorChange}>
                {users && users.map(u => (
                  <option
                    key={u._id}
                    value={u.username}>
                    {u.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="category-select">
            <h3 className='sub-heading'>ប្រភេទអត្ថបទ:</h3>
            {categories && categories.map((cat, index) => (
              <label className="categories" key={index}>
                {cat.catName}
                <input
                  type="checkbox"
                  value={cat.catName}
                  name={cat.catName}
                  checked={cat?.isChecked || false}
                  // checked={cat.isChecked && cat.isChecked || false}
                  onChange={handleCategoryChange} />
                <span className="mark"></span>
              </label>
            ))}
          </div>

          {/* Image upload */}
          <div className="image-select">
            <h3 className='sub-heading'>រូបភាពក្រប:</h3>
            <div className="form-group" id='imgBox'>
              <input
                type="file"
                id='imgFile'
                className='imgInput'
                accept='image/*'
                onChange={loadFileandUpload} />
              <label
                className='upload-icon'
                htmlFor="imgFile">
                {!thumbnail && <p><FaCloudUploadAlt /> Upload Image</p>}
                {thumbnail && (
                  <img
                    className='thumb-preview'
                    src={URL.createObjectURL(thumbnail)}
                    alt="thumbnail" />
                )}
              </label>
              {thumbnail && (
                <>
                  {percent < 100 && (
                    <div className="progress-bar">
                      <p className="progress" style={{ width: percent?.toFixed() + '%' }} percentage={percent?.toFixed()}></p>
                    </div>
                  )}
                  <p className="progress-count">{percent?.toFixed() + '%'}</p>
                  {percent === 100 && (
                    <div className="file-info">
                      <p className='fileSize'>Size: {(thumbnail.size / 1000000).toFixed(2)} MB</p>
                      <p className="fileName">File: {thumbnail.name}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AddStyle >
  )
}
