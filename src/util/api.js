const URL = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

export const getLanguage = async (lang) => {
    try {
        const res = await fetch(`${URL}/languages?keyword=${lang}`);
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
};
