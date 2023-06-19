export const load = async ({ fetch, params }) => {
  const id = params.slug;

  const response = await fetch(`/api/tv/detail?query=${id}`);

  return {
    id,
    show: await response.json()
  }
};