import axios from 'axios'

export const createPet = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + '/pet', value, {
        headers: {
            authtoken,
        },
    })
}

export const listPet = async()=>
    await axios.get(process.env.REACT_APP_API + '/pet')