export const host = process.env.REACT_APP_HOST;

export const LoginRoute = `${host}/api/auth/login`;
export const RegisterRoute = `${host}/api/auth/register`;
export const AvatarPost = `${host}/api/auth/setavatar/`; 

export const Upload = `${host}/api/upload`;

export const CreatePost = `${host}/api/posts/`; 
export const GetPost = `${host}/api/posts/search/`; 
export const GetUserPost = `${host}/api/posts/timeline/`; 
export const LikePost = `${host}/api/posts/like/`; 

export const GetUser = `${host}/api/users/`; 
export const SearchUser = `${host}/api/users/search/`; 
export const FollowhUser = `${host}/api/users/follow/`; 
export const UnFollowhUser = `${host}/api/users/unfollow/`; 
export const getChatUserList = `${host}/api/users/chatUsers/`; 


export const getChatMsg = `${host}/api/message/getMsg`; 
export const sendMsgRoute = `${host}/api/message//addMsg`; 
