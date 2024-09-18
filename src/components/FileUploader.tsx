import TitleH4Component from '@/components/TitleH4Component'
import { useState, useRef, useCallback, MutableRefObject } from 'react'
import plusCircle from '@/assets/svg/plus-circle.svg'
import trashCan from '@/assets/svg/trashCan.svg'

interface FileUploaderProps {
  title: string
  customStyles?: string
  required: boolean
  fileRef: MutableRefObject<File | null>
}

const FileUploader = ({
  title = '',
  customStyles = '',
  fileRef,
  required = false,
}: FileUploaderProps) => {
  // State for the preview of the image
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [dropRejected, setDropRejected] = useState(false)
  // Ref for the input element
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Function to handle the drag over div Element
  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
    },
    []
  )

  // Function to handle the drop event on the div element
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    // Prevent the default behavior of the browser when a file is dropped
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    uploadFile(file)
  }, [])

  // Function to upload the file
  const uploadFile = useCallback((file: File) => {
    if (file && file.size <= 1048576) {
      // 1MB is 1048576 bytes approximately
      setDropRejected(false)
      fileRef.current = file

      // updating the preview of the image
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setDropRejected(true)
    }
  }, [])

  // When User selects a file from the input element
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null
      uploadFile(file!)
    },
    []
  )

  const handleDelete = useCallback(() => {
    setPreview(null)
    fileRef.current = null
    inputRef.current!.value = ''
  }, [])

  // Please keep in mind that this used to be a component that used react dropzone library.
  // after spending 4 hours trying to make it work, I decided to use the native drag and drop after
  // finding a stupid reason why it didn't work.

  // FUTURE-NOTE: react-dropzone is a great library, but it adds an additional path attribute
  // to the file object which is not present in File type by default, thus messes up the whole process of submitting files.
  // RIP my 4 hours

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
              className="absolute translate-x-[3px] translate-y-[3px] cursor-pointer transition-transform hover:scale-125"
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
