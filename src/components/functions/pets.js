import axios from 'axios'

export const createPet = async (authtoken, value) => {
    return await axios.post(REACT_APP_API + '/pet', value, {
        headers: {
            authtoken,
        },
    })
}