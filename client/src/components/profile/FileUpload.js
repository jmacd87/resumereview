import React, { Fragment, useState } from 'react'
import axios from 'axios'
import Message from './Message'
import Progress from './Progress'

const FileUpload = () => {
    const [file, setFile] = useState('')
    const [message, setMessage] = useState('')
    const [fileName, setFileName] = useState('Choose Resume')
    const [uploadedFile, setUploadedFile] = useState({})
    const [uploadPercentage, setUploadPercentage] = useState(0)

    const onChange = e => {
        e.preventDefault()
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }
    const onSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                }
            })

            const { fileName, filePath } = res.data
            setUploadedFile({ fileName, filePath })

            setMessage('File Uploaded')
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('Problem with Server')
            } else {
                setMessage(err.response.data.msg)
            }
        }
    }
    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input onChange={onChange} type='file' className='custom-file-input' id='customFile' />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {fileName}
                    </label>
                </div>
                {uploadPercentage ? <Progress percentage={uploadPercentage} /> : null}
                <input type='submit' value="Submit" className='btn btn-primary btn-block  ' />

            </form>
            {uploadedFile ? (
                <div className='row mt-5'>
                    <div className="col-md-6- m-auto">
                        <h3 className="text-center">{uploadedFile.fileName}</h3>
                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
                    </div>
                </div>) : null}
        </Fragment>
    )

}
export default FileUpload