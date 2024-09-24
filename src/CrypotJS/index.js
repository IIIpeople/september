// 导入CryptoJS模块
import CryptoJS from 'crypto-js';
/**
 * 加密
 * @param {*} data 
 * @param {*} key 
 * @returns 
 */
export function encryptAES(data, key) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}
/**
 * 解密
 * @param {*} ciphertext 
 * @param {*} key 
 * @returns 
 */
export function decryptAES(ciphertext, key) {
    console.log(ciphertext, key);
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8)
}