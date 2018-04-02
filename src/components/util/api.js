import axios from 'axios'

const getContent = (req, callback) => {
    axios.get(req)
        .then(res => {
            const html = res.data.content.rendered
            callback(html)
        })
        .catch(err => console.log(err))
}

export default getContent
