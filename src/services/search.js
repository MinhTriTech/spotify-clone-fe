import axios from '../axios';

const fetchSearch = async (query) => {
    try {
        const response = await axios.get('api/music/search/', {
          params: { q: query },
        });
        return response.data;
      } catch (error) {
        console.error('Lỗi khi tìm kiếm người dùng:', error);
        return null;
      }
    
};

export const searchService = {
    fetchSearch,
};
