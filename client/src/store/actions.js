import axios from 'axios'

export const getValues = async () => {
    try {
        const result = await axios.get('https://inequality-dnd.herokuapp.com/api/values')
        return { status: 'success', payload: result.data }
    } catch (error) {
        return { status: 'failure' }
    }
}