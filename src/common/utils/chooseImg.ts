import { ElMessage } from 'element-plus'
import { isImage } from './fileHandleHelper'

function toPreviewer(dataUrl: string, fileName: any, cb: Function) {
  cb && cb(dataUrl, fileName)
}

function compress(img: any, fileType: any, maxWidth: any) {
  let canvas: any = document.createElement('canvas')
  let ctx: any = canvas.getContext('2d')

  const proportion = img.width / img.height
  const width = maxWidth
  const height = maxWidth / proportion

  canvas.width = width
  canvas.height = height

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, width, height)

  // 压缩
  const base64data = canvas.toDataURL(fileType, 0.75)
  canvas = ctx = null

  return base64data
}

const chooseImg = (file: File, cb: Function, maxsize: number = 0) => {
  if (!file) {
    return
  }

  if (!isImage(file.type)) {
    ElMessage.error('该文件不是图片格式！')
    return
  }

  const reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onload = function () {
    // this.result 为 base64 图片编码
    // this 指向 reader 对象
    const { result } = this

    // 如果不判断图片大小 或 图片小于设置的大小，则不压缩，直接在上传区域预览
    if (maxsize === null || result.length <= maxsize) {
      // 预览图片
      toPreviewer(result, file, cb)
      return
    }

    // 否则，压缩图片
    let img: any = new Image()

    img.src = result

    // 压缩图片
    img.onload = function () {
      const compressedDataUrl = compress(img, file.type, maxsize / 1024)
      toPreviewer(compressedDataUrl, file, cb)
      img = null
    }
  }
}

export default chooseImg
