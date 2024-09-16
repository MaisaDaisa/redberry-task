import TitleH4Component from '@/components/TitleH4Component'
import { useState, useRef } from 'react'
import plusCircle from '@/assets/svg/plus-circle.svg'
import trashCan from '@/assets/svg/trashCan.svg'

interface FileUploaderProps {
  title: string
  customStyles?: string
  required: boolean
  setFileState: (file: File | null) => void
}

const FileUploader = ({
  title = '',
  customStyles = '',
  setFileState,
  required = false,
}: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [dropRejected, setDropRejected] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const uploadFile = (file: File) => {
    if (file && file.size <= 1048576) {
      // 1MB
      setDropRejected(false)
      setFileState(file)

      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setDropRejected(true)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    uploadFile(file!)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    uploadFile(file)
  }

  const handleDelete = () => {
    setPreview(null)
    setFileState(null)
    inputRef.current!.value = ''
  }

  // Please keep in mind that this used to be a component using react dropzone
  // after spending 4 hours trying to make it work, I decided to use the native drag and drop
  // FUTURE-NOTE: react-dropzone is a great library, but it adds an additional path attribute
  // to the file object which messes up the whole process somehow RIP to my 4 hours

  return (
    <TitleH4Component
      title={title}
      customStyles={customStyles}
      required={required}
    >
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group flex h-[120px] items-center justify-center border border-dashed ${
          !dropRejected ? 'border-primary-text-100' : 'border-invalid-red'
        } w-full select-none rounded-lg ${
          preview ? 'cursor-default' : 'cursor-pointer'
        }`}
        aria-label="File upload area"
        role="button"
      >
        <input
          type="file"
          disabled={!!preview}
          onChange={(event) => {
            handleInputChange(event)
          }}
          hidden
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
        {preview ? (
          <div className="relative flex flex-col items-end justify-end">
            <img
              src={preview as string}
              alt="preview"
              className="h-[82px] w-[96px] rounded-[4px] object-cover"
            />
            <img
              src={trashCan}
              alt="delete"
              width={14}
              height={14}
              className="absolute translate-x-[3px] translate-y-[3px] cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        ) : (
          <img
            src={plusCircle}
            alt="plus-circle"
            className={`h-[24px] w-[24px] scale-100 transition-transform group-hover:scale-125`}
          />
        )}
      </div>

      <div>
        <p
          className={`main-text-sm-100-400 mt-2 !text-invalid-red ${
            !dropRejected ? 'invisible' : ''
          }`}
        >
          Please input an image file under 1MB
        </p>
      </div>
    </TitleH4Component>
  )
}

export default FileUploader
