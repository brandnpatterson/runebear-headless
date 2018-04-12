import axios from 'axios'

let getContent = (req, callback) => {
    axios.get(req)
        .then(res => {
            let html = res.data.content.rendered
            callback(html)
        })
        .catch(err => console.log(err))
}

export default getContent
