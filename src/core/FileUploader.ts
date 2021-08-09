import { axiosInstance } from '../axiosInstance'
import GetUserToken from './GetUserToken'

export default async function FileUploader (files: Array<any>, objectOwner: string, importType: string, afterUploadEvent: string = '') {
  var formData = new FormData()
  files.forEach(function (item:any) {
    formData.append('file', item)
  })

  return await axiosInstance.post('webportal/FileUpload/FileUpload', formData, {
    params: {
      accessToken: GetUserToken(),
      objectOwner: objectOwner,
      afterUploadEvent: afterUploadEvent,
      importType: importType
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
