import { axiosInstance } from '../axiosInstance'
import { CodeBookItem } from '../WebModel/Shared/CodeBookItem'
import _ from 'lodash'

export async function GetCodeBookDefaultValue (codeBookIdentificator: string, codeBookData: CodeBookItem[]) {
  let returnValue: string
  returnValue = ''
  if (codeBookData?.length === 0 || codeBookData?.length === undefined) {
    await axiosInstance.get('/shared/CodeBook/GetCodeBookItems/' + codeBookIdentificator).then(function (response) {
      const defaultItem = response?.data?.data?.find((x: CodeBookItem) => x.isDefault)
      returnValue = _.get(defaultItem, 'id', '')
    })
  } else {
    const defaultItem = codeBookData.find((x: CodeBookItem) => x.isDefault)
    returnValue = _.get(defaultItem, 'id', '')
  }
  return returnValue
}
