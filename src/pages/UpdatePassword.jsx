import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { resetPassword,ChangeUserPassword } from "../services/Auth"


function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (token === null) {
      const token = location.pathname.split("/").at(-1)
      resetPassword(dispatch, password, confirmPassword, token, navigate)
    }
    else {
      ChangeUserPassword(dispatch,currentPassword,password,confirmPassword,token)
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] bg-richblue-2 h-[100vh] w-[100vw] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (

        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-white">
            Almost done. Enter your new password and youre all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            {
              token != null && (
                <label className="relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                    Current Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    placeholder="Enter Password"
                    className="form-style w-full !pr-10 placeholder:text-white"
                  />
                  {/* <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#000000" />
                )}
              </span> */}
                </label>
              )
            }
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full !pr-10 placeholder:text-white"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#000000" />
                )}
              </span>
            </label>
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style w-full !pr-10 placeholder:text-white"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#000000" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword