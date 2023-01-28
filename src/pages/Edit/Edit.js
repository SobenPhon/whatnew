import { useState, useEffect } from 'react'
import { EditStyle } from './EditStyled'
import { useParams } from 'react-router-dom'
import { usePostContext } from '../../hook/usePostContext'
import { useAuthContext } from '../../hook/useAuthContext'
import useAuth from '../../hook/useAuth'
import { baseURL } from '../../config'

import { MdDone } from 'react-icons/md'
import { MdClear } from 'react-icons/md'
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md'

import { TextEditor } from '../../components/TextEditor/TextEditor'
import { Markup } from 'interweave'

import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { BtnBack } from '../../components/BtnBack/BtnBack'

export const Edit = () => {
  const { user } = useAuthContext()
  const { isAdmin, isEditor } = useAuth()
  const { dispatch } = usePostContext()
  const [post, setPost] = useState({})
  const [isLoading, setLoading] = useState(true)

  const { id } = useParams()

  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [message, setMessage] = useState()
  const [alertVisible, setAlertVisible] = useState(false)

  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [authorId, setAuthorId] = useState('')

  // form data
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [category, setCategory] = useState([])
  const [image, setImage] = useState('https://peacehumanity.org/wp-content/uploads/2021/11/placeholder-54.png')

  const [imgUrl, setImgUrl] = useState('')
  const [percent, setPercent] = useState(null)

  const [thumbnail, setThumbnail] = useState()
  const [clicked, setClicked] = useState('')

  useEffect(() => {
    // Check authorization
    const checkAuth = async () => {
      const response = await fetch(`${baseURL}/api/checkauth/${id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      }

      if (response.ok) {
        user && fetchPost()
        fetchCategories()
        fetchUser()
      }
    }
    user && checkAuth()

    const fetchPost = async () => {
      const response = await fetch(`${baseURL}/api/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      })

      let data = {}

      try {
        data = await response.json()
      } catch (error) {
        setError(response.statusText)
      }

      if (!response.ok) {
        if (response.status === 404) {
          setError(data.error)
        }
      }

      if (response.ok) {
        setPost(data)
        setTitle(data.title)
        setValue(data.description)
        setCategory(data.category)
        setImage(data.image)

        setSelectedAuthor(data.author)
        setAuthorId(data.user_id)
        setLoading(false)
        setError(null)
      }
    }

    const fetchCategories = async () => {
      const res = await fetch(`${baseURL}/api/categories`)
      const data = await res.json()

      if (!res.ok) {
        console.error('something went wrong!')
      }

      if (res.ok) {
        setCategories(data)
      }
    }

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

  }, [id, user, isAdmin, isEditor])

  const loadFileandUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0])

      // Upload image to database and retreive its link
      const imageFile = e.target.files[0]
      if (imageFile == null) return

      const uniqueName = new Date().getTime() + imageFile.name
      // const imageName = imageFile.name + v4()

      const imageRef = ref(storage, `images/${uniqueName}`)

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
          setCategory(preCat => [...preCat, value])
        } else {
          setCategory(category.filter(scat => scat !== value))
        }
        return { ...cat, isChecked: checked }
      } else {
        return cat
      }
    })
    setCategories(tempCat)
  }

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value)
    const [selectUser] = users?.filter(u => u.username === e.target.value)
    setAuthorId(selectUser._id)
  }

  // Edit post
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (clicked === 'btnSubmit') {
      const postData = {
        title,
        description: value,
        author: selectedAuthor,
        category: category,
        image: imgUrl ? imgUrl : image,
        user_id: authorId
      }

      const response = await fetch(`${baseURL}/api/posts/${post._id}`, {
        method: "PATCH",
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
        setAlertVisible(true)
      }

      if (response.ok) {
        // console.log('post edited: ', data)
        setError(null)
        setMessage('Post successfully updated')
        setAlertVisible(true)
        dispatch({ type: 'UPDATE_POST', payload: data })

        setTimeout(() => {
          setAlertVisible(false)
        }, 3000);
      }
    }
  }

  return (
    <EditStyle onSubmit={handleSubmit}>
      <div className="action-menu mb-1">
        <BtnBack onClick={() => setClicked('btnBack')} />
      </div>

      {isLoading && (
        error ? <div className='error'><MdOutlineDoNotDisturbAlt /> {error}</div> : <div>Loading...</div>
      )}
      {!isLoading && (
        <div className='editing'>
          {/* Editor */}
          <div className="edit-area">
            {/* Message */}
            <div className="alertMessage">
              {(message && alertVisible) && <div className="message"><MdDone /> {message}</div>}
              {error && alertVisible && <div className="error"><MdClear /> {error}</div>}
            </div>

            <h1 className='main-heading'>កែសម្រួលអត្ថបទ</h1>
            <div className="form-group">
              <label>ចំណងជើង</label>
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

            {error && <div>{error}</div>}

            {/* Live Update */}
            <div className="live-preview">
              <h1 className='title'>ចំណងជើង: <span>{title}</span></h1>
              <p className='category'>ប្រភេទ: {category}</p>
              <p className='author'>អ្នកសរសេរ: {selectedAuthor}</p>
              <div className="description">
                <Markup content={value} />
              </div>
              <p className='image-link'>Link រូបភាព: <a target='_blank' rel="noreferrer" href={image}>ចុចទីនេះ</a></p>
              <img className='image-preview' src={thumbnail ? URL.createObjectURL(thumbnail) : image} alt={title} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="setting">
            <button
              onClick={() => setClicked('btnSubmit')}
              className='btn-submit icon-align'>📝 ធ្វើបច្ចុប្បន្នភាព</button>

            <h1 className='main-heading'>ការកំណត់</h1>

            <div className="author-select">
              <h3 className='sub-heading author-title'>អ្នកសរសេរ៖</h3>
              <div className="form-group">
                <select
                  className='post-author form-control'
                  value={selectedAuthor}
                  onChange={handleAuthorChange}>
                  {users && users.map(user => (
                    <option key={user._id} value={user.username} >
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="category-select">
              <h3 className='sub-heading'>ប្រភេទអត្ថបទ៖</h3>
              {categories && categories.map((cat, index) => (
                <label className="categories" key={cat._id}>
                  {cat.catName}
                  <input
                    type="checkbox"
                    value={cat.catName}
                    defaultChecked={post?.category.includes(cat.catName) || false}
                    onChange={handleCategoryChange}
                  />
                  <span className="mark"></span>
                </label>
              ))}
            </div>

            {/* Image upload */}
            <div className="image-select">
              <h3 className='sub-heading'>រូបភាពក្រប៖</h3>
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
                  {!thumbnail && (
                    <img
                      className='thumb-preview'
                      src={image}
                      alt={post.title} />
                  )}
                  {thumbnail && (
                    <img
                      className='thumb-preview'
                      src={URL.createObjectURL(thumbnail)}
                      alt={thumbnail.name} />
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
      )}
    </EditStyle >
  )
}
