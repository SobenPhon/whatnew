import { DashMediaStyle } from "./DashMedia.styled"
import { useEffect, useState } from "react"

import { getDownloadURL, ref, uploadBytesResumable, listAll } from "firebase/storage"
import { storage } from "../../../firebase"
import { useRef } from "react"

export const DashMedia = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [imageList, setImageList] = useState([])
  const [imgUrl, setImgUrl] = useState('')

  const [loaded, setLoaded] = useState(false)

  const types = ['image/jpeg', 'image/png']

  const imageListRef = ref(storage, 'images/')

  useEffect(() => {
    let isCanceled = false

    listAll(imageListRef).then(response => {
      // setListLength(response.items.length)
      response.items.forEach(item => {
        getDownloadURL(item).then(url => {
          if (!isCanceled) {
            setImageList(pre => [...pre, url])
          }
        })
      })
    })

    return () => {
      isCanceled = true
    }
  }, [])

  useEffect(() => {
    const images = document.querySelectorAll('[data-src]')

    function preloadImage(img) {
      const src = img.getAttribute('data-src')
      if (!src) {
        console.log('no src!')
        return
      }
      img.src = src
    }

    const imgOptions = {
      threshold: 0,
      rootMargin: '0px 0px 300px 0px'
    }

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return
        } else {
          preloadImage(entry?.target)
          imgObserver.unobserve(entry.target)
        }
      })
    }, imgOptions)

    images?.forEach(image => {
      imgObserver.observe(image)
    })
  }, [imageList])

  const handleChange = (e) => {
    let selectedFile = e.target.files[0]

    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile)
      setError('')

      const uniqueName = new Date().getTime() + selectedFile.name
      const imageRef = ref(storage, `images/${uniqueName}`)
      // uploadBytes(imageRef, selectedFile).then(() => {
      // })
      const uploadTask = uploadBytesResumable(imageRef, selectedFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress.toFixed(2) + '% done')
          // setPercent(progress)
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
            setImageList(pre => [...pre, downloadURL])
            // setUploading(false)
          })
        }
      )
    } else {
      setFile(null)
      setError('Please select an image file (png or jpeg)')
    }
  }

  return (
    <DashMediaStyle>
      <form>
        <input id="btn-choose" className="btn-input" type="file" onChange={handleChange} />
        <label htmlFor="btn-choose" className="btn-choose">បន្ថែមរូបភាពថ្មី</label>
      </form>

      <div className="output mb-1">
        {error && <div className="error">{error}</div>}
        {file && <div>File Size: {(file.size / 1000000).toFixed(2)} MB</div>}
        {file && <div>File Name: {file.name}</div>}
      </div>

      <div className="image-list">
        {imageList?.map((url, index) => (
          <a key={index} href={url}>
            <img
              className={`image ${loaded ? 'loaded' : 'loadingg'}`}
              data-src={url}
              alt=""
              onLoad={() => setLoaded(true)} />
          </a>
        ))}
      </div>

    </DashMediaStyle>
  )
}
