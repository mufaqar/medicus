import { useState, useEffect } from 'react'

/* eslint-disable */
const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    if (typeof e === 'string') {
      setErrors({ ...errors, phone: '' })
      setValues({
        ...values,
        phone: e
      })
    }
    if (typeof e === 'object') {
      const { name, value } = e.target
      setErrors({ ...errors, [name]: '' })
      setValues({
        ...values,
        [name]: value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrors(validate(values))
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors])

  return { handleChange, handleSubmit, values, errors }
}

export default useForm
