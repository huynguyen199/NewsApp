import {useState} from "react"

const useDialog = () => {
  const [dialog, setDialog] = useState({
    isSuccess: false,
    isFailed: false,
    isLoading: false,
    isConfirm: false,
  })

  const showConfirmDialog = () => {
    // setIsLoading(true)
    setDialog((prev) => ({...prev, isConfirm: true}))
  }

  const hideConfirmDialog = () => {
    // setIsLoading(false)
    setDialog((prev) => ({...prev, isConfirm: false}))
  }

  const showLoadingDialog = () => {
    // setIsLoading(true)
    setDialog((prev) => ({...prev, isLoading: true}))
  }

  const hideLoadingDialog = () => {
    // setIsLoading(false)
    setDialog((prev) => ({...prev, isLoading: false}))
  }

  const showSuccessDialog = () => {
    // setIsSuccess(true)
    setDialog((prev) => ({...prev, isSuccess: true}))
  }

  const hideSuccessDialog = () => {
    setDialog((prev) => ({...prev, isSuccess: false}))
  }

  const showFailedDialog = () => {
    // setIsFailed(true)
    setDialog((prev) => ({...prev, isFailed: true}))
  }

  const hideFailedDialog = () => {
    setDialog((prev) => ({...prev, isFailed: false}))
  }
  return {
    dialog,
    showLoadingDialog,
    hideLoadingDialog,
    showSuccessDialog,
    hideFailedDialog,
    hideSuccessDialog,
    showFailedDialog,
    showConfirmDialog,
    hideConfirmDialog,
  }
}

export default useDialog
