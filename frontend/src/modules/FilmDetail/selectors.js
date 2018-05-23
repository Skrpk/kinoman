export const getUserId = (state) => {
  if (state.auth.get('user').user_id) {
    return state.auth.get('user').user_id;
  } else {
    return -1;
  }
}