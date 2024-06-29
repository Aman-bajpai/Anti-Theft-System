
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = '70710126853-n7r581j54r3b9s4om2fclppdda76kkg3.apps.googleusercontent.com';

function Login() {
  const onSuccess = (response) => {
    console.log("Login success current user: ", response);

    if (response && response.credential) {
      const { credential } = response;
      console.log("Credential:", credential);

      const jwtPayload = parseJwt(credential); 

      if (jwtPayload) {
        console.log("User info:", {
          email: jwtPayload.email,
          name: jwtPayload.name,
          imageUrl: jwtPayload.picture,
        });
      } else {
        console.log("Failed to decode JWT payload.");
      }
    } else {
      console.log("User info not found in response:", response);
    }
  };

  const onError = (error) => {
    console.log("Login failed", error);
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div id="signInButton" className='rounded-lg uppercase hover:opacity-95 bg-red-500'>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          useOneTap
          uxMode="popup"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;