/**
 * 图片压缩上传
 * @param {*} file 
 */
export function Compress_Pictures(file) {
    return new Promise((resolve, reject) => {
        let predefinedSize = 1024 * 1024; // 1MB 的大小，单位为字节
        let fileSizeInMB = file.file.size / predefinedSize // 1MB 的大小，单位为字节
        console.log(fileSizeInMB);
        const reader = new FileReader();
        reader.readAsDataURL(file.file);
        reader.onload = function () {
            const img = new Image();
            img.src = reader.result;
            img.onload = async function () {
                // 获取图片的宽高
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const maxWidth = 500; // 设置最大宽度为800px
                const maxHeight = 500; // 设置最大高度为600px

                let width = img.width;
                let height = img.height;

                // 计算压缩比例
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                // 设置canvas的宽高
                canvas.width = width;
                canvas.height = height;

                // 将图片绘制到canvas上
                ctx.drawImage(img, 0, 0, width, height);

                // 将canvas转换为base64格式并上传
                const compressedImageBase64 = canvas.toDataURL("image/jpg", 0.7); // 0.7为图片质量，可根据需求调整
                // 在这里将 compressedImageBase64 上传到服务器或其他操作
                // console.log(compressedImageBase64);
                const padding = (compressedImageBase64.endsWith('==')) ? 2 : (compressedImageBase64.endsWith('=')) ? 1 : 0;
                const size = compressedImageBase64.length * 3 / 4 - padding;
                console.log(size);
                const mb = size / (1024 * 1024);
                console.log('压缩后大小:' + mb + 'MB');
                // 找到 "base64," 的位置
                let base64Index = compressedImageBase64.indexOf('base64,');
                console.log('压缩后base64截取索引:' + base64Index);
                let newbase64 = compressedImageBase64.substring((base64Index + 7))
                // Image_data.value.push(newbase64)
                console.log(newbase64);
                //返回压缩后新的base64
                // return newbase64
                resolve(newbase64);
            };
        };
        reader.onerror = reject;
    })
}