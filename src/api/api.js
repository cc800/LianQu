// 导入axios实例
import httpRequest from '@/request/index'
import {ElMessage} from "element-plus";

//question  ********************************************************************
export function getQuestion() {
    return httpRequest({
        url: '/api/question/curQuestion',
        method: 'get'
    })
}
export function getQuestionList() {
    return httpRequest({
        url: '/api/question/questionList',
        method: 'get'
    })
}
export function putQuestionRIndex(r) {
    return httpRequest({
        url: '/api/question/reply/'+r.id,
        method: 'put'
    })
}
export function putQuestionCIndex(r) {
    return httpRequest({
        url: '/api/question/combo/'+r.id,
        method: 'put'
    })
}

export function putQuestionContent(r) {
    return httpRequest({
        url: '/api/question/content',
        method: 'put',
        data:r
    })
}

export function postQuestion(r){
    return httpRequest({
        url:'/api/question',
        method:'post',
        data:r
    })
}

//user  ********************************************************************
export function getCurUser() {
    return httpRequest({
        url: '/api/user/curUser',
        method: 'get'
    })
}
export function login(user) {
    return httpRequest({
        url: '/api/user/login',
        method: 'post',
        data: user
    })
}

//record  ********************************************************************

export function postReplyRecord(r) {
    return httpRequest({
        url: '/api/userRecord',
        method: 'post',
        data: r
    })
}
export function deleteReplyRecord(r) {
    return httpRequest({
        url: '/api/userRecord/'+r,
        method: 'delete'
    })
}
export function getReplyRecordList() {
    return httpRequest({
        url: '/api/userRecord/list',
        method: 'get'
    })
}
//wan ********************************************************************

//添加一个wan
export function postWan(r) {
    return httpRequest({
        url: '/api/wan',
        method: 'post',
        data: r
    })
}

//更新
export function putWan(r) {
    return httpRequest({
        url: '/api/wan',
        method: 'put',
        data: r
    })
}

//删除
export function deleteWanById(r) {
    return httpRequest({
        url: '/api/wan/' + r,
        method: 'delete'
    })
}


export function searchWanByName(type) {
    return httpRequest({
        url: '/api/wan/listByName?type='+type,
        method: 'get'
    })
}

export function searchWanByData(startTime,endTime) {
    return httpRequest({
        url: '/api/wan/listByData',
        method: 'post',
        data:[_dataFormatForRequest(startTime),_dataFormatForRequest(endTime)]
    })
}

//获取wanlist
export function getWanList() {
    return httpRequest({
        url: '/api/wan/list',
        method: 'get'
    })
}

//获取随机一个wan
export function getRandomWan() {
    return httpRequest({
        url: '/api/wan/random',
        method: 'get'
    })
}

//letter  ********************************************************************

export function getLetterList() {
    return httpRequest({
        url: '/api/letter/list',
        method: 'get'
    })
}

//info  ********************************************************************
export function getRandomInfo(id) {
    return httpRequest({
        url: '/api/myInfo/random/'+id,
        method: 'get'
    })
}

export function getInfoList(id){
    return httpRequest({
        url: '/api/myInfo/list/'+id,
        method: 'get'
    })
}

export function putInfoUid(id){
    return httpRequest({
        url: '/api/myInfo/used/'+id,
        method: 'put',
    })
}

export function putInforDid(id){
    return httpRequest({
        url: '/api/myInfo/deleted/'+id,
        method: 'put',
    })
}

export function putInfoContent(r){
    return httpRequest({
        url: '/api/myInfo/content',
        method: 'put',
        data:r
    })
}

export function postInfo(r){
    return httpRequest({
        url: '/api/myInfo',
        method: 'post',
        data:r
    })
}

export function getTest(url,param){
    return httpRequest({
        url: url,
        method: 'get',
        data: param
    })
}



//utils  ********************************************************************

export function showMsgBox(v) {
    ElMessage({
        type: 'success',
        message: v,
        center: true,
        duration: 600
    })
}


export function _dataFormat(data) {
    let d = new Date(data);
    let year = d.getFullYear();
    year=year.toLocaleString().substring(3,5)
    let month = d.getMonth() + 1;
    let day = d.getDate();
    return year + '.' + month + '.' + day;
}

function _dataFormatForRequest(data) {
    let d = new Date(data);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    if(month<10) month='0'+month
    if(day<10) day='0'+day
    // return '2022-07-16T00:00:00'
    return year + '-' + month + '-' + day+'T'+"00:00:00";
}

//简单转换为html换行
export function _transFormEnter(v){
    return v.replace(/\n/g,'<br/>')
}


export function _getFooterImage(){
    return '/content/image/main_spirit.png'
}

export function _getHeaderImage(){
    return '/content/image/main_spirit.png'
}

export function _getSpiritImage(){
    return '/content/image/main_spirit.gif'
}

export function _getImage(id){
    return httpRequest({
        url: '/api/letter/image/'+id,
        method: 'get'
    })
}

export function _information(user){
    return httpRequest({
        url: '/api/letter/information',
        method: 'post',
        data:user
    })
}
