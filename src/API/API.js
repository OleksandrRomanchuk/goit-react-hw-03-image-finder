const API_URL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  key: '30148042-04f4434198648da1763487888',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const fetchImages = (query, pageNumber) => {
  return fetch(`${API_URL}?${searchParams}&q=${query}&page=${pageNumber}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.status);
    })
    .catch(error => console.log(error.message));
};
