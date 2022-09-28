/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { submitApplication } from '../services'
import {
  GlobeAltIcon,
  ClockIcon,
  AcademicCapIcon,
  MinusCircleIcon,
  CheckIcon
} from '@heroicons/react/outline'
import Loader from './Loader'
import { universiteler } from '../util'

const questions = [
  'Hangi sağlık alanında çalışıyorsunuz?',
  'Nerede ve ne kadar süre eğitim aldınız?',
  'İş deneyiminiz?',
  'Almanca dil seviyeniz?',
  // 'Tercih ettiğiniz bir veya daha fazla şehir var mı? ',
  'Diğer Bilgiler',
  'Teşekkürler'
]

const content = {
  oncekiAdim: 'Önceki adıma dön',
  fizyoterapist: 'Fizyoterapist',
  hemsire: 'Hemşire',
  radyolog: 'Radyolog',
  ebe: 'Ebe',
  anestezist: 'Anestezist',
  doktor: 'Uzman Doktor',
  asistan: 'Asistan Doktor',
  pratisyen: 'Pratisyen Hekim',
  ergoterapist: 'Ergoterapist',
  disHekimi: 'Diş Hekimi',
  ambulans: 'Ambulans Hekimi',
  patolog: 'Patolog',
  eczaci: 'Eczacı',
  yil: 'yıl',
  yildanFazla: 'yıldan fazla',
  detay: 'Hangi üniversiteden mezunsunuz?',
  tamam: 'Tamam',
  deneyimsiz: 'Deneyimim yok',
  hic: 'Hiç',
  evet: 'Evet',
  hayir: 'Hayır',
  sehir: 'Lütfen hangi şehirleri tercih etiğinizi belirtiniz.',
  sartlar: 'Genel Şartlar ve Koşullar',
  okudum: 'okudum ve kabul ediyorum.',
  gonder: 'Gönder',
  diger: 'Diğer',
  geri: 'Geri',
  ulasti:
    'Bilgileriniz bize ulaştı, sizi daha yakından tanımak için sabırsızlanıyoruz.',
  terms1: 'Genel Şartlar ve Koşullar',
  terms2: 'Gizlilik Politikası',
  terms3:
    'Başvuru bilgilerimin başvuru havuzuna dahil edilmesine izin veriyorum.'
}

const buttonStyle =
  'shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center inline-flex items-center mr-3 mb-2'

const ApplicationForm = () => {
  const router = useRouter()
  const { query } = router
  const [error, setError] = useState('')
  // const [showCity, setShowCity] = useState(false)
  const [isSubmiting, setSubmiting] = useState(false)
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(1)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({
    occupation: query.occupation || '',
    univercity: '',
    education: '',
    experience: '',
    languageLevel: '',
    // city: '',
    email: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    terms: false,
    kvp: false,
    gdpr: false
  })

  const errorEmpty = 'Tüm alanlar zorunludur!'
  const errorEmail = 'Lütfen geçerli bir e-posta adresi giriniz.'
  const errorCity = 'Lütfen geçerli bir şehir adı giriniz.'
  const errorEducation = 'Lütfen üniversitenizi ve eğitim yılınızı giriniz.'
  const errorPhone =
    'Telefon numaranız en az 8 karakter icermeli ve rakkamlardan oluşmalıdır!'

  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  )

  const patternNumber = new RegExp(/^[0-9]*$/)

  const toTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  const getLevel = (item) => {
    switch (item) {
      case '1':
        return 'Hic'
      case '2':
        return 'A1'
      case '3':
        return 'A2'
      case '4':
        return 'B1'
      case '5':
        return 'B2'
      case '6':
        return 'C1'
    }
  }

  const Steps = ({ i, last, current, done }) => (
    <button onClick={done ? () => setStep(i) : null} type="button">
      <li className="relative mb-6 w-12 sm:w-16 md:w-20 z-0">
        <div className="flex items-center">
          <div
            className={`${current ? 'p-6 -ml-3' : ''} ${
              done ? 'bg-green-300' : 'bg-gray-300'
            } flex z-10 justify-center items-center w-6 h-6  rounded-full ring-0 ring-white sm:ring-8 shrink-0`}
          >
            {i}
          </div>
          {!last && <div className="hidden sm:flex w-full bg-gray-200 h-0.5" />}
        </div>
      </li>
    </button>
  )

  useEffect(() => {
    if (formData.occupation !== '') {
      setStep(2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      univercity: e.target.value
    }))
  }

  const onClick = (e) => {
    setError('')
    const { target } = e
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }))
    }
    if (target.name !== 'education') {
      setStep((step) => step + 1)
      toTop()
    }
  }

  const onInputChange = (e) => {
    setError('')
    const { target } = e
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }))
    }
  }

  const handlePostSubmission = () => {
    const {
      univercity,
      occupation,
      education,
      experience,
      languageLevel,
      // city,
      firstName,
      lastName,
      contactNumber,
      email,
      terms,
      kvp,
      gdpr
    } = formData
    if (
      univercity === '' ||
      occupation === '' ||
      email === '' ||
      education === '' ||
      experience === '' ||
      languageLevel === '' ||
      // city === '' ||
      !terms ||
      !kvp ||
      !gdpr ||
      firstName === '' ||
      lastName === '' ||
      contactNumber === ''
    ) {
      setError(errorEmpty)
      return
    }
    if (!patternNumber.test(contactNumber) || contactNumber.length < 9) {
      setError(errorPhone)
      return
    }
    if (!pattern.test(email)) {
      setError(errorEmail)
      return
    }
    let lang = getLevel(languageLevel)

    toTop()
    setSubmiting(true)
    const obj = {
      univercity,
      occupation,
      education,
      experience,
      languageLevel,
      // city,
      email,
      contactNumber,
      firstName,
      lastName
    }

    const form = {
      first_name: firstName,
      last_name: lastName,
      email,
      contact_number: contactNumber,
      qualification_id: Number(education),
      title: occupation,
      specialization: occupation,
      work_ex_year: Number(experience),
      city: occupation,
      custom_fields: [
        {
          field_id: 1,
          value: univercity
        },
        {
          field_id: 3,
          value: lang
        }
      ],
      language_skills: [
        {
          language_id: 33,
          proficiency_id: Number(languageLevel)
        }
      ]
    }

    submitApplication(obj, form)
      .then((res) => {
        if (res.createApplication) {
          formData.univercity = ''
          formData.occupation = ''
          formData.education = ''
          formData.experience = ''
          formData.languageLevel = ''
          formData.firstName = ''
          formData.lastName = ''
          formData.contactNumber = ''
          formData.email = ''
          // formData.city = ''
          setFormData((prevState) => ({
            ...prevState,
            ...formData
          }))
          setSubmiting(false)
          setShowSuccessMessage(true)
          setStep((step) => step + 1)
        }
      })
      .catch((err) => {
        setError(err)
      })
  }

  if (isSubmiting) {
    return <Loader />
  }

  return (
    <div className="grid mx-auto place-items-center pt-8 pb-20 md:pb-24 form">
      {step < 6 && (
        <ol className="items-center flex">
          {Array(5)
            .fill('')
            .map((_i, index) => (
              <Steps
                key={index}
                i={index + 1}
                last={index + 1 === 5}
                done={index + 1 < step}
                current={index + 1 === step}
              />
            ))}
        </ol>
      )}
      {/* {step > 1 && step < 7 && (
        <button
          onClick={() => setStep((step) => step - 1)}
          name="education"
          value="4 yil"
          type="button"
          className="text-center inline-flex text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          {content.oncekiAdim}
        </button>
      )} */}
      {questions && (
        <h3 className="font-bold my-8 text-base text-medicus text-lg text-center sm:text-lg sm:mx-auto  md:text-xl lg:mx-0 fadeinup">
          {questions[step - 1]}
        </h3>
      )}
      {step === 1 && (
        <div className="flex flex-wrap justify-center md:justify-start pb-4 fadeinup">
          {!show ? (
            <>
              <button
                onClick={onClick}
                name="occupation"
                value="Fizyoterapist"
                type="button"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center mr-3 mb-2"
              >
                <svg
                  viewBox="0 0 512.001 512.001"
                  className="w-8 h-8"
                  fill="white"
                >
                  <path d="m196.371 242.536-78.681 10.473v5.144h.234c64.986.001 14.168-.083 82.216-.083l-3.769-15.534z" />
                  <circle cx="162.185" cy="34.967" r="34.967" />
                  <path d="M244.139 196.35c-2.191-9.034-10.28-15.234-19.349-15.234-1.86 0 1.152-.33-44.664 5.77-2.324 18.791-19.826 32.5-38.928 29.745l-51.158-7.348c-1.185 3.034-1.645 6.4-1.185 9.858 1.453 10.916 11.482 18.588 22.385 17.125l98.387-13.097 8.465 34.902h3.408c5.754-9.274 13.421-17.244 22.604-23.422a77.848 77.848 0 0 1 8.161-4.787l-8.126-33.512zm131.425 43.654H287.38c-21.882-.002-41.564 11.783-51.819 30.332l138.258 13.11H208.767c-9.171 0-16.607 7.435-16.607 16.607s7.436 16.607 16.607 16.607c183.103 0 176.889-.12 176.889-.12 11.374.145 21.085-9.138 21.146-20.908l.122-23.724c.09-17.386-13.951-31.815-31.36-31.904zM184.102 276.4H35.555c-11.006 0-19.93 8.923-19.93 19.93 0 11.006 8.923 19.93 19.93 19.93h142.559a32.085 32.085 0 0 1-4.249-13.381c-.909-10.331 3.17-19.944 10.237-26.479zm325.179 75.09c0-9.53-7.727-17.256-17.256-17.256H19.975c-9.529 0-17.256 7.725-17.256 17.256 0 8.092 5.578 14.863 13.093 16.728-.001.084-.007.165-.007.249v111.556c0 17.632 14.346 31.978 31.978 31.978 9.529 0 17.256-7.725 17.256-17.256 0-8.67-6.393-15.845-14.722-17.07V371.001h411.365v106.675c-8.329 1.225-14.722 8.401-14.722 17.07 0 9.53 7.727 17.256 17.256 17.256 17.633 0 31.978-14.346 31.978-31.978V368.467c0-.084-.006-.165-.007-.249 7.515-1.865 13.094-8.636 13.094-16.728z" />
                  <path d="M277.598 142.407 219.309 85.84a16.87 16.87 0 0 0-11.748-4.764h-90.75A16.87 16.87 0 0 0 102.8 88.55l-32.611 48.624-16.642 24.814c-3.641 5.43-3.815 12.556-.399 18.167a16.928 16.928 0 0 0 12.013 7.928l78.519 11.277c9.244 1.328 17.782-5.12 19.097-14.301 1.324-9.223-5.078-17.773-14.301-19.098l-51.961-7.463 21.176-31.574v16.99l33.264 4.777c12.395 1.779 22.336 9.954 26.865 20.899l29.231-4.536v-44.095l38.237 37.108-4.524 9.176c9.955 4.699 17.591 13.7 20.331 24.995l1.637 6.749 18.248-37.013a16.872 16.872 0 0 0-3.382-19.567zm219.224 147.501a6.23 6.23 0 0 0-6.147-5.244h-11.107c8.481-6.362 13.997-16.473 14.067-27.893.12-19.398-15.508-35.22-34.906-35.34l-.222-.001c-19.295.001-34.998 15.583-35.118 34.906-.072 11.576 5.467 21.876 14.066 28.328h-7.94a6.232 6.232 0 0 0-6.232 6.232v18.036a6.237 6.237 0 0 0 6.235 6.234h61.158a6.232 6.232 0 0 0 6.232-6.232c0-19.115.055-18.149-.086-19.026z" />
                </svg>

                {content.fizyoterapist}
              </button>

              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="Hemsire"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center mr-3 mb-2"
              >
                <svg className="w-8 h-8" viewBox="0 0 512 512" fill="white">
                  <path d="M255.999 219.351c60.475 0 109.675-49.2 109.675-109.675C365.674 49.201 316.476 0 255.999 0S146.324 49.2 146.324 109.676c0 60.477 49.2 109.675 109.675 109.675zm0-179.227c38.351 0 69.551 31.2 69.551 69.552 0 38.352-31.2 69.551-69.551 69.551s-69.551-31.2-69.551-69.551c0-38.35 31.201-69.552 69.551-69.552zm106.348 220.242C192.436 182.193 1.22 308.095 1.22 491.938c0 11.08 8.982 20.062 20.062 20.062h469.436c11.08 0 20.062-8.982 20.062-20.062 0-103.131-61.637-191.624-148.433-231.572zm-106.348 16.915c21.355 0 41.987 3.144 61.47 8.977l-61.47 60.228-61.47-60.228c19.483-5.832 40.115-8.977 61.47-8.977zM42.272 471.876c6.801-73.061 50.376-135.606 111.979-168.907l87.707 85.935c7.801 7.642 20.28 7.642 28.08 0l87.707-85.935c61.604 33.302 105.178 95.847 111.979 168.907H42.272z" />
                  <path d="M395.1 383.94v-9.362c0-11.08-8.982-20.062-20.062-20.062s-20.062 8.982-20.062 20.062v9.362h-9.362c-11.08 0-20.062 8.982-20.062 20.062 0 11.08 8.982 20.062 20.062 20.062h9.362v9.362c0 11.08 8.982 20.062 20.062 20.062s20.062-8.982 20.062-20.062v-9.362h9.362c11.08 0 20.062-8.982 20.062-20.062 0-11.08-8.982-20.062-20.062-20.062H395.1z" />
                </svg>
                {content.hemsire}
              </button>

              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="UzmanDoktor"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center mr-3 mb-2"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 459.993 459.993"
                  fill="white"
                >
                  <circle cx="232.075" cy="78.755" r="8.951" />
                  <path d="M440.745 444.993H389.77v-15.368c0-35.193-9.385-62.355-27.894-80.732-23.593-23.424-53.203-23.475-54.407-23.474h-37.572v-22.734c0-.396-.04-.783-.099-1.163 24.057-9.94 39.261-26.521 48.52-40.897 14.433-22.41 17.689-43.977 17.82-44.883.052-.357.078-.716.078-1.077v-1.606c5.268-1.299 9.85-4.017 13.489-8.046 10.619-11.757 10.001-30.306 9.244-37.734-.577-5.655-3.135-10.4-7.398-13.723-3.045-2.373-6.612-3.737-10.054-4.497V74.917c0-24.675-10.201-41.169-31.185-50.424-8.509-3.752-6.268-11.918-5.402-14.27a7.5 7.5 0 0 0-12.328-7.99c-11.883 12.052-24.456 11.734-47.278 11.157-15.905-.403-35.696-.904-61.753 2.825-35.786 5.119-51.659 27.232-58.673 44.881-7.027 17.684-6.599 34.197-6.501 36.481v49.109c0 .797.127 1.564.357 2.285-3.568.741-7.3 2.116-10.467 4.584-4.263 3.322-6.822 8.067-7.399 13.723-.757 7.429-1.374 25.978 9.245 37.734 3.679 4.074 8.326 6.804 13.668 8.085v1.567c0 .36.026.72.078 1.076.131.907 3.387 22.474 17.82 44.884 9.258 14.375 24.462 30.956 48.518 40.896-.059.38-.099.767-.099 1.164v22.734h-37.517c-1.227.008-30.869.051-54.46 23.474-18.509 18.377-27.894 45.54-27.894 80.732v15.368H19.248a7.5 7.5 0 0 0 0 15h421.497a7.5 7.5 0 0 0 0-14.999zM315.387 89.913c-.448-.366-2.322-1.798-6.253-3.656h17.364v34.77l-8.359-7.867V95.718a7.507 7.507 0 0 0-2.752-5.805zm28.639 78.888c.892 8.739-.072 20.201-5.453 26.158a11.873 11.873 0 0 1-2.357 2.008v-33.594c2.325.268 4.651.865 6.13 2.028.717.563 1.477 1.407 1.68 3.4zM185.674 31.064c24.813-3.55 43.908-3.065 59.249-2.678 17.998.456 32.3.818 45.184-5.784 1.779 6.164 6.028 12.033 14.152 15.616 14.548 6.417 21.306 16.411 22.144 33.039h-53.61c-3.54-19.264-20.445-33.911-40.718-33.911-20.272 0-37.176 14.647-40.717 33.911H137.08c5.332-16.593 18.12-35.833 48.594-40.193zm-52.298 90.3V97.4a7.82 7.82 0 0 0-.011-.405c-.032-.611-.202-4.771.495-10.739h17.236c-3.913 1.85-5.791 3.279-6.251 3.656a7.503 7.503 0 0 0-2.751 5.805v17.441l-8.718 8.206zm125.11-42.607c0 14.563-11.848 26.411-26.411 26.411s-26.41-11.848-26.41-26.411 11.848-26.411 26.41-26.411c14.563 0 26.411 11.848 26.411 26.411zM121.243 194.959c-5.38-5.957-6.345-17.419-5.454-26.158.203-1.993.963-2.837 1.68-3.401 1.518-1.193 3.926-1.794 6.31-2.051v33.729a11.803 11.803 0 0 1-2.536-2.119zm33.344 58.007c-11.735-18.011-15.267-35.842-15.808-38.914v-77.175l15.955-15.015a7.502 7.502 0 0 0 2.36-5.462v-16.384c4.63-2.247 15.324-6.311 35.508-8.743 5.318 16.734 21 28.894 39.472 28.894 18.294 0 33.844-11.928 39.309-28.411 17.774 2.456 27.42 6.154 31.754 8.259V116.4c0 2.068.854 4.044 2.36 5.462l15.718 14.791v77.397c-.548 3.109-4.085 20.922-15.808 38.915-16.809 25.798-41.947 39.985-74.714 42.169H229.3c-32.767-2.183-57.905-16.37-74.713-42.168zm73.982 57.153c.162.01.323.016.485.016h1.886c.162 0 .323-.005.485-.016 8.499-.551 16.299-1.832 23.473-3.668v26.469a7.495 7.495 0 0 0 4.421 6.833l-31.175 32.119-28.084-31.875c2.931-1.02 5.038-3.799 5.038-7.078V306.45c7.172 1.836 14.972 3.118 23.471 3.669zM85.224 429.626c0-88.177 64.527-89.206 67.301-89.206h27.914l41.811 47.453a7.5 7.5 0 0 0 5.447 2.54l.181.002a7.498 7.498 0 0 0 5.381-2.276l46.317-47.718h27.948c.277-.011 24.576.047 43.785 19.118 15.568 15.457 23.462 39.039 23.462 70.088v15.368H192.168V402.83a7.5 7.5 0 0 0-7.5-7.5h-66.673a7.5 7.5 0 0 0-7.5 7.5v42.163H85.224v-15.367zm91.944-10.956h-51.673v-8.34h51.673v8.34zm-51.673 15h51.673v11.323h-51.673V433.67z" />
                  <circle cx="176.76" cy="152.317" r="8.951" />
                  <circle cx="283.235" cy="152.317" r="8.951" />
                  <path d="M228.063 205.045h3.868c9.666 0 17.554-7.664 17.961-17.232.026-.252.039-.509.039-.768v-43.678a7.5 7.5 0 0 0-15 0v43.678c0 1.654-1.346 3-3 3h-3.868c-1.654 0-3-1.346-3-3a7.5 7.5 0 0 0-15 0c0 9.925 8.075 18 18 18zm48.428 40.012a7.5 7.5 0 0 0-11.675-9.417c-.08.1-9.089 9.939-32.971 9.939-24.809 0-36.903-10.295-37.494-10.812a7.5 7.5 0 0 0-10.063 11.123c.658.6 16.468 14.689 47.557 14.689 31.226 0 43.365-13.933 44.646-15.522z" />
                </svg>
                {content.doktor}
              </button>

              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="PratisyenHekim"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center mr-3 mb-2"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 179.242 179.242"
                  fill="white"
                >
                  <path d="M89.722 91.433c25.208 0 45.716-20.508 45.716-45.716S114.93 0 89.722 0 44.006 20.508 44.006 45.716s20.508 45.717 45.716 45.717zm0-81.433c12.902 0 24.226 6.877 30.504 17.157H99.439c-1.29-4.313-5.284-7.459-10.017-7.459s-8.727 3.146-10.017 7.459H59.218C65.496 16.877 76.821 10 89.722 10zm-33.41 23.107c.162.027.326.05.495.05h22.597c1.29 4.313 5.284 7.459 10.017 7.459s8.727-3.146 10.017-7.459h23.198c.17 0 .333-.023.496-.05a35.527 35.527 0 0 1 2.306 12.609c0 19.694-16.022 35.716-35.716 35.716S54.006 65.41 54.006 45.716c0-4.437.82-8.685 2.306-12.609zm89.331 120.661-3.869-32.308c-2.001-16.718-16.208-29.326-33.046-29.326H70.181c-17.012 0-31.235 12.752-33.085 29.663l-3.523 32.201a22.794 22.794 0 0 0 5.681 17.675 22.796 22.796 0 0 0 16.951 7.569h66.833a22.787 22.787 0 0 0 17.029-7.656 22.788 22.788 0 0 0 5.576-17.818zm-13.057 11.181a12.776 12.776 0 0 1-9.549 4.293H56.205c-3.676 0-7.052-1.507-9.506-4.244-2.454-2.737-3.585-6.258-3.186-9.912l3.523-32.201a23.245 23.245 0 0 1 21.113-20.656v17.581a7.443 7.443 0 0 0 3 14.255 7.444 7.444 0 0 0 3-14.256v-17.676h29.538v19.447c-6.819 1.393-11.965 7.438-11.965 14.662v11.807a3 3 0 0 0 3 3h4.643a3 3 0 1 0 0-6h-1.643v-8.807c0-4.943 4.021-8.965 8.965-8.965s8.965 4.021 8.965 8.965v8.807h-1.643a3 3 0 1 0 0 6h4.643a3 3 0 0 0 3-3v-11.807c0-7.224-5.146-13.269-11.965-14.662v-19.402c11.352.467 20.795 9.096 22.157 20.47l3.869 32.308a12.772 12.772 0 0 1-3.127 9.993z" />
                  <path d="M75.391 49.051c.79 0 1.56-.32 2.13-.88.55-.56.87-1.34.87-2.12 0-.79-.32-1.57-.88-2.13-1.12-1.11-3.12-1.11-4.24 0-.56.56-.88 1.34-.88 2.13 0 .78.32 1.56.88 2.12s1.33.88 2.12.88zm28.66 0c.79 0 1.57-.32 2.12-.88.56-.56.88-1.33.88-2.12s-.32-1.57-.88-2.13c-1.11-1.11-3.12-1.11-4.24 0a3.02 3.02 0 0 0-.88 2.13c0 .79.32 1.56.88 2.12s1.33.88 2.12.88zM83.735 69.247h11.976c.69 0 1.25-.56 1.25-1.25v-1.174c0-.69-.56-1.25-1.25-1.25H83.735c-.69 0-1.25.56-1.25 1.25v1.174c0 .691.56 1.25 1.25 1.25z" />
                </svg>
                {content.pratisyen}
              </button>

              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="AsistanDoktor"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center mr-3 mb-2"
              >
                <svg className="w-8 h-8" viewBox="0 0 512 512" fill="white">
                  <path d="M359.353 380.598c-9.421-4.971-32.608-18.128-42.642-27.56v-25.616c32.116-18.387 54.037-51.277 60.987-91.491 18.189-5.216 34.019-22.287 34.019-37.988 0-15.889-11.938-26.433-31.672-28.62v-18.471c.668-6.672 6.065-71.81-32.304-114.677C326.256 12.172 295.39 0 256 0c-39.394 0-70.262 12.173-91.749 36.179-38.367 42.869-32.964 108.006-32.296 114.674v18.469c-19.734 2.187-31.672 12.731-31.672 28.62 0 15.707 15.842 32.786 34.019 37.992 6.952 40.22 28.872 73.107 60.987 91.489v25.616c-10.039 9.438-33.249 22.604-42.66 27.569-102.846 33.403-105.081 94.346-105.125 96.93L47.503 512h416.994v-34.365c-.013-2.6-1.487-63.95-105.144-97.037zm20.691-195.331c14.09 1.981 15.811 9.268 15.811 12.676 0 6.462-6.985 15.259-16.108 20.128.186-3.178.297-32.804.297-32.804zm-263.899 12.676c0-3.408 1.722-10.696 15.81-12.676 0 0 .112 29.629.298 32.809-9.117-4.867-16.108-13.667-16.108-20.133zm59.984-151.249C194.475 26.236 221.348 15.863 256 15.863c34.648 0 61.518 10.372 79.865 30.828 27.914 31.124 29.364 77.881 28.792 95.662-62.093-2.481-108.869-34.996-109.347-35.332l-12.519-8.876v15.345c0 6.385-12.829 15.658-48.833 22.534-18.172 3.471-36.553 5.21-46.626 5.977-.541-18.046 1.069-64.389 28.797-95.307zM149.15 228.251a145.831 145.831 0 0 1-1.332-19.754v-50.615c10.25-.756 29.488-2.537 48.972-6.248 31.433-5.988 50.669-14.567 58.206-26.046 17.234 10.181 57.938 30.665 109.187 32.631v50.278c0 6.665-.448 13.311-1.333 19.759-5.371 39.341-26.408 71.208-57.718 87.43-14.785 7.662-31.315 11.547-49.13 11.547s-34.347-3.885-49.133-11.547c-31.311-16.216-52.348-48.083-57.719-87.435zm151.699 106.723v18.25c-5.426 5.665-22.595 21.512-44.849 21.512-22.11 0-39.398-15.878-44.849-21.528v-18.234c13.937 5.386 28.966 8.121 44.849 8.121 15.882 0 30.911-2.736 44.849-8.121zm147.786 161.164H63.365v-18.366c.065-1.664 3.028-52.707 94.785-82.279 0 0 30.018-15.722 44.796-28.077 8.132 7.65 24.215 20.047 45.122 22.675v92.859h15.863v-92.859c20.908-2.628 36.99-15.025 45.122-22.675 14.779 12.355 44.835 28.089 44.835 28.089 26.88 8.513 63.057 24.548 82.761 52.6 11.315 16.108 11.96 28.993 11.985 29.649v18.384z" />
                  <path d="M242.813 211.151h26.364v26.385h79.196v-68.642h-79.196v26.395h-26.364v-26.395h-79.196v68.642h79.196v-26.385zm42.226-26.395h47.471v36.917h-47.471v-36.917zm-58.089 36.918h-47.471v-36.917h47.471v36.917zm36.981 23.772h-15.862v34.316h29.039V263.9h-13.177zm50.126 203.189h84.452v15.862h-84.452zm-100.283-47.503h21.108v15.863h-21.108zm0 31.661h21.108v15.863h-21.108zm0 31.672h21.108v15.863h-21.108z" />
                </svg>
                {content.asistan}
              </button>

              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="Ergoterapist"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center mr-3 mb-2"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 460.659 460.659"
                  fill="white"
                >
                  <path d="M441.078 445.659h-50.976v-15.367c0-27.619-5.806-50.267-17.24-67.629.03-.273.049-.551.049-.832V134.527c0-46.964-16.068-82.726-47.757-106.29C301.055 10.317 267.801.327 231.357.014c-.099-.003-.195-.014-.294-.014-.245 0-.488.005-.733.006-.245-.001-.488-.006-.733-.006-.099 0-.196.011-.294.015-36.444.313-69.698 10.303-93.797 28.223-31.689 23.564-47.757 59.326-47.757 106.29v227.304c0 .281.019.559.049.832-11.434 17.362-17.24 40.01-17.24 67.629v15.367H19.581a7.5 7.5 0 0 0 0 15h421.497a7.5 7.5 0 0 0 0-15.001zm-65.976 0H270.279V341.086h36.217v29.061c-6.453 2.338-11.751 7.259-15.274 14.326-3.188 6.392-3.938 12.439-4.013 13.107a7.56 7.56 0 0 0-.047.837v20.417a7.5 7.5 0 0 0 7.5 7.5 7.5 7.5 0 0 0 7.5-7.5v-19.917c.33-2.17 2.56-14.093 11.834-15.229 9.263 1.135 11.498 13.026 11.834 15.232v19.914a7.5 7.5 0 0 0 7.5 7.5 7.5 7.5 0 0 0 7.5-7.5v-20.417a7.56 7.56 0 0 0-.047-.837c-.075-.668-.825-6.716-4.013-13.107-3.524-7.067-8.821-11.988-15.274-14.326v-26.962c8.665 2.281 20.098 7.044 30.144 17.019 15.569 15.457 23.463 39.038 23.463 70.088v15.367zM231.026 295.801h-1.394c-32.768-2.185-57.905-16.371-74.713-42.169-11.735-18.011-15.267-35.842-15.808-38.913v-82.915c16.352-1.352 54.045-8.435 88.873-43.685 12.007 14.432 42.852 44.3 92.46 44.3.367 0 .734-.002 1.103-.006v82.315c-.529 3.06-3.935 20.471-15.509 38.441-16.803 26.093-42.038 40.435-75.012 42.632zm-2.124 14.984c.161.011.323.016.485.016h1.886c.162 0 .324-.005.485-.016 8.5-.551 16.299-1.832 23.473-3.668v26.469c0 .282.019.56.049.833v38.673l-24.945 26.923-24.904-26.919v-65.979c7.172 1.836 14.971 3.117 23.471 3.668zm-23.473 84.398 19.395 20.965a7.5 7.5 0 0 0 5.503 2.407h.003a7.502 7.502 0 0 0 5.501-2.402l19.448-20.99v50.497h-49.85v-50.477zM144.457 40.274c21.758-16.181 52.233-25.133 85.873-25.262 33.64.129 64.115 9.081 85.873 25.262 27.675 20.579 41.708 52.291 41.708 94.253v211.075c-22.743-19.472-48.995-19.545-50.109-19.517H270.23v-22.734c0-.396-.04-.783-.099-1.163 24.057-9.941 39.261-26.522 48.519-40.897 14.433-22.41 17.689-43.977 17.82-44.884.052-.357.078-.716.078-1.076v-90.733a7.499 7.499 0 0 0-8.053-7.479c-2.69.198-5.399.3-8.05.3-55.651 0-85.259-44.545-85.543-44.98a7.5 7.5 0 0 0-11.912-.922c-39.382 44.313-85.486 45.592-90.613 45.592-.291 0-.465-.004-.495-.005a7.56 7.56 0 0 0-5.477 2.097 7.5 7.5 0 0 0-2.294 5.398v90.733c0 .36.026.72.078 1.076.131.907 3.387 22.474 17.82 44.884 9.258 14.375 24.462 30.956 48.519 40.897-.059.38-.099.767-.099 1.163v22.734h-37.518c-1.148-.001-27.419.05-50.163 19.517V134.527c.001-41.962 14.033-73.673 41.709-94.253zm5.539 345.398c7.26 0 13.167 5.906 13.167 13.167 0 7.26-5.907 13.166-13.167 13.166s-13.167-5.906-13.167-13.166c0-7.261 5.906-13.167 13.167-13.167zm-64.439 44.62c0-67.679 38.011-84.016 56.938-87.955v29.356c-11.901 3.293-20.667 14.212-20.667 27.146 0 15.531 12.636 28.166 28.167 28.166 15.531 0 28.167-12.635 28.167-28.166 0-12.934-8.766-23.853-20.667-27.146v-30.607h32.934v104.573H85.557v-15.367z" />
                  <circle cx="177.092" cy="166.997" r="8.951" />
                  <circle cx="283.567" cy="166.997" r="8.951" />
                  <path d="M229.03 215.379h2.6c8.026 0 14.556-6.529 14.556-14.556a7.5 7.5 0 0 0-14.987-.444h-1.737a7.5 7.5 0 0 0-7.487-7.056 7.5 7.5 0 0 0-7.5 7.5c-.001 8.027 6.529 14.556 14.555 14.556z" />
                  <circle cx="149.996" cy="398.839" r="4.666" />
                  <path d="M275.694 235.177a7.497 7.497 0 0 0-10.546 1.13c-.08.099-9.088 9.939-32.971 9.939-24.794 0-36.889-10.282-37.493-10.811a7.5 7.5 0 0 0-10.064 11.122c.658.6 16.468 14.688 47.557 14.688 31.226 0 43.365-13.934 44.646-15.522a7.5 7.5 0 0 0-1.129-10.546z" />
                </svg>
                {content.ergoterapist}
              </button>
              <button
                type="button"
                onClick={() => setShow(true)}
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center mr-3 mb-2"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  xmlSpace="preserve"
                  fill="white"
                >
                  <path d="M6 10.5C5.17157 10.5 4.5 11.1716 4.5 12C4.5 12.8284 5.17157 13.5 6 13.5C6.82843 13.5 7.5 12.8284 7.5 12C7.5 11.1716 6.82843 10.5 6 10.5Z" />
                  <path d="M10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12Z" />
                  <path d="M16.5 12C16.5 11.1716 17.1716 10.5 18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12Z" />
                </svg>
                {content.diger}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShow(false)}
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center mr-3 mb-2"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 400.004 400.004"
                  className="w-8 h-8"
                  xmlSpace="preserve"
                  fill="white"
                >
                  <path d="M382.688 182.686H59.116l77.209-77.214c6.764-6.76 6.764-17.726 0-24.485-6.764-6.764-17.73-6.764-24.484 0L5.073 187.757c-6.764 6.76-6.764 17.727 0 24.485l106.768 106.775a17.252 17.252 0 0 0 12.242 5.072c4.43 0 8.861-1.689 12.242-5.072 6.764-6.76 6.764-17.726 0-24.484l-77.209-77.218h323.572c9.562 0 17.316-7.753 17.316-17.315 0-9.562-7.753-17.314-17.316-17.314z" />
                </svg>
                {content.geri}
              </button>
              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="DisHekimi"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center  mr-3 mb-2"
              >
                <svg
                  viewBox="0 0 459.653 459.653"
                  className="w-8 h-8"
                  fill="white"
                  xmlSpace="preserve"
                >
                  <circle cx="84.8" cy="80.77" r="29.041" />
                  <path d="m91.427 254.46 4.499-54.728-1.509.878c-8.002 4.659-18.083 2.541-23.597-4.592l-27.293-35.231 34.486 25.505a14.113 14.113 0 0 0 15.494.849l62.437-36.355c6.736-3.922 9.017-12.562 5.095-19.298-3.922-6.736-12.563-9.018-19.298-5.095l-54.41 31.682-27.019-19.982 22.601 8.557 15.879-9.246c-2.903-7.237-9.675-12.611-17.974-13.294l-37.774-3.105c-11.698-.962-21.961 7.742-22.923 19.441l-6.712 108.861 8.902 58.042L.607 386.506c-2.473 9.02 2.835 18.338 11.855 20.811 9.026 2.473 18.339-2.84 20.812-11.855l22.657-82.637c.629-2.294.768-4.694.407-7.045l-8.224-53.621 6.589.542 20.203 55.082-16.877 79.692c-1.938 9.15 3.91 18.14 13.06 20.078 9.151 1.937 18.14-3.91 20.078-13.06l17.886-84.459a16.945 16.945 0 0 0-.668-9.341L91.427 254.46zm120.878-11.668 76.602 50.594a15.833 15.833 0 0 0 19.417-1.532c2.859-.897-1.355 1.594 60.82-39.44l65.134 9.661c8.151 1.213 15.743-4.42 16.952-12.573 1.209-8.153-4.42-15.743-12.573-16.952l-70.78-10.498a14.91 14.91 0 0 0-10.41 2.307l-31.008 20.465-12.504-9.747-12.674 13.262c-5.057 5.292-12.797 6.496-19.078 3.55l-44.944-21.165 47.216 8.408c4.09.728 8.287-.633 11.171-3.651l34.331-35.922c4.746-4.966 4.567-12.838-.398-17.584-4.966-4.746-12.838-4.567-17.584.398l-29.724 31.102-40.651-7.239 31.76-2.791-20.053-15.633c-8.077-6.297-19.729-4.854-26.026 3.223l-19.4 24.885c-6.643 8.517-4.62 20.912 4.404 26.872z" />
                  <circle cx="184.511" cy="178.66" r="27.451" />
                  <path d="M442.329 312.792c6.712 2.431 14.12-1.041 16.549-7.751 2.43-6.71-1.041-14.12-7.751-16.549l-65.85-23.841a12.923 12.923 0 0 0-11.358 1.262l-74.638 47.701-151.777-99.821c-5.963-3.923-13.976-2.267-17.897 3.696-3.922 5.962-2.267 13.976 3.696 17.897L292.08 339.81a12.922 12.922 0 0 0 14.06.092l7.616-4.867 22.239 47.045h-36.899c-7.137 0-12.922 5.786-12.922 12.922 0 7.137 5.786 12.922 12.922 12.922h145.573c7.137 0 12.922-5.786 12.922-12.922 0-7.137-5.786-12.922-12.922-12.922h-39.565l-35.926-82.465 13.291-8.495 59.86 21.672z" />
                </svg>
                {content.disHekimi}
              </button>
              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="Ebe"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center  mr-3 mb-2"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 15a8.001 8.001 0 0 1 7.938 7H4.062A8.001 8.001 0 0 1 12 15zm-1.813 2.28A6.025 6.025 0 0 0 6.8 20H12l-1.813-2.72zm3.627 0L12 20h5.199a6.02 6.02 0 0 0-3.385-2.72zM18 2v6A6 6 0 1 1 6 8V2h12zM8 8c0 2.21 1.79 4 4 4s4-1.79 4-4H8zm8-4H8v2h8V4z" />
                </svg>
                {content.ebe}
              </button>
              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="Radyolog"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center  mr-3 mb-2"
              >
                <svg className="w-8 h-8" viewBox="0 0 64 64" fill="white">
                  <path
                    d="M50.579 56.62a2.99 2.99 0 1 1-5.98 0v-2.608h5.979l.001 2.608zm-7.889 7.103h-8.503l.013-4.196h-2.849l-.004 4.196h-8.519v-9.711H42.69zM20.852 56.62a2.989 2.989 0 1 1-5.979 0v-2.608h5.979v2.608zM32.729.704a7.723 7.723 0 0 1 7.722 7.726 7.722 7.722 0 0 1-7.722 7.724 7.725 7.725 0 1 1 0-15.45zm21.968 50.297h-43.94V25.322h43.94v25.679zm-6.863-23.558H17.787v21.472h30.047V27.443z"
                    fill="currentColor"
                  />
                  <path
                    d="M34.187 40.135v1.885h5.503c.229 0 .565.206.565.562 0 3.21-.402 4.722-2.093 4.722-1.754 0-2.114-3.797-3.975-4.047v3.634h-2.941V43.25c-1.953.148-2.268 4.054-4.091 4.054-1.69 0-2.001-1.512-2.001-4.722 0-.356.337-.562.565-.562h5.526v-1.885h-5.721a.593.593 0 1 1 0-1.189h5.721v-1.885h-6.439a.595.595 0 1 1 0-1.191h6.439v-1.883h-6.044a.595.595 0 0 1-.596-.596c0-.326.267-.597.596-.597h6.044v-1.882H26.51a.596.596 0 1 1 0-1.194h4.735v-1.041h2.941v1.041h4.735a.597.597 0 0 1 0 1.194h-4.735v1.881h6.062a.6.6 0 0 1 .597.597.595.595 0 0 1-.597.596h-6.062v1.883h6.459a.595.595 0 1 1 0 1.191h-6.459v1.885h5.722a.595.595 0 1 1 0 1.189l-5.722.001zm7.542-22.091H23.982c-3.211 0-6.182 1.713-7.853 4.268h33.194a8.905 8.905 0 0 0-7.594-4.268z"
                    fill="currentColor"
                  />
                </svg>
                {content.radyolog}
              </button>
              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="Anestezist"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center  mr-3 mb-2"
              >
                <svg
                  viewBox="0 0 489.838 489.838"
                  className="w-8 h-8"
                  fill="white"
                >
                  <path d="M446.713 235.481c-19.6-19.6-43.7-33.1-69.9-39.5 41.8-45.9 41.4-117-2.9-161.3-30.9-30.9-101.1-58.9-164.4 0l-175.8 174.8c-44.7 45.8-45.2 119.1 0 164.4 56.9 56.9 134.8 33.1 164 1.4 6.1 25.7 18.9 50.4 38.9 70.4 71 71 165.4 44.7 210.1 0 57.8-57.8 57.2-151.9 0-210.2zm-194.2 165c-27.8-41.6-23.5-99.2 13.2-135.8 50.6-50.6 115.3-28.2 135.1-13.3l-148.3 149.1zm-14.9-337.7c37.4-35.7 86.8-19.3 106.1 0 29.6 29.6 29.1 78 0 107.2l-23.4 23.4c-25 3.6-48.6 13.6-68.8 29l-86.5-86.5 72.6-73.1zm-174.8 283c-29.7-29.7-29.1-78 0-107.2l73.1-73.6 86.7 86.7c-15 20.4-24.2 43.8-27.6 67.8l-26.2 26.2c-18.7 18.9-68 38.1-106 .1zm354.8 70.8c-22.8 22.8-76.5 49.6-136.2 13.4l149-149.8c28.2 41.6 24 99.6-12.8 136.4z" />
                </svg>
                {content.anestezist}
              </button>
              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="AmbulansHekimi"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center  mr-3 mb-2"
              >
                <svg className="w-8 h-8" viewBox="0 0 297 297" fill="white">
                  <path d="M82.022 174.126h6.497v6.497a8.083 8.083 0 0 0 16.164 0v-6.497h6.497a8.083 8.083 0 0 0 0-16.164h-6.497v-6.496a8.083 8.083 0 0 0-16.164 0v6.496h-6.497a8.083 8.083 0 0 0 0 16.164z" />
                  <path d="M249.704 112.762c-3.714-13.278-16.689-22.349-30.477-22.349h-10.903l-2.583-19.19c-1.105-8.209-8.185-14.399-16.468-14.399H174.4c-8.283 0-15.363 6.19-16.467 14.399l-2.584 19.19H10.102C4.523 90.413 0 94.936 0 100.515v138.398c0 5.579 4.523 10.102 10.102 10.102h7.235c.766 19.207 16.623 34.6 36.015 34.6s35.249-15.392 36.015-34.6h118.267c.766 19.207 16.623 34.6 36.015 34.6s35.249-15.392 36.015-34.6h7.234c5.579 0 10.102-4.523 10.102-10.102v-42.835c0-10.82-3.907-19.322-11-23.94-5.324-3.466-17.605-7.8-25.127-10.284 0 .001-7.779-36.97-11.169-49.092zm27.092 83.316v32.733h-2.369c-6.339-10.366-17.764-17.3-30.779-17.3s-24.439 6.934-30.779 17.3H193.2v-48.995h57.549c9.618 3.038 21.196 7.282 24.226 9.255.757.491 1.821 2.99 1.821 7.007zm-46.534-77.803 9.384 41.337h-46.445v-48.995h26.026c4.937 0 9.319 3.06 11.035 7.658zm-52.725-41.247h8.599l1.802 13.385h-12.203l1.802-13.385zM20.204 110.617h152.793v118.194H84.13c-6.339-10.366-17.764-17.3-30.779-17.3s-24.439 6.934-30.779 17.3h-2.369V110.617zm33.147 152.794c-8.739 0-15.848-7.109-15.848-15.848s7.109-15.848 15.848-15.848 15.848 7.109 15.848 15.848-7.109 15.848-15.848 15.848zm190.298 0c-8.739 0-15.848-7.109-15.848-15.848s7.109-15.848 15.848-15.848 15.848 7.109 15.848 15.848c-.001 8.739-7.11 15.848-15.848 15.848z" />
                  <path d="M96.601 213.444c26.136 0 47.4-21.264 47.4-47.4s-21.264-47.399-47.4-47.399-47.4 21.263-47.4 47.399 21.264 47.4 47.4 47.4zm0-78.635c17.224 0 31.236 14.013 31.236 31.235 0 17.224-14.013 31.236-31.236 31.236s-31.236-14.013-31.236-31.236c-.001-17.222 14.012-31.235 31.236-31.235zm85.236-84.551c5.579 0 10.102-4.523 10.102-10.102V23.487c0-5.579-4.523-10.102-10.102-10.102s-10.102 4.523-10.102 10.102v16.668c0 5.579 4.523 10.103 10.102 10.103zm33.336 16.668h16.668c5.579 0 10.102-4.523 10.102-10.102s-4.523-10.102-10.102-10.102h-16.668c-5.579 0-10.102 4.523-10.102 10.102s4.524 10.102 10.102 10.102zm-83.341 0H148.5c5.579 0 10.102-4.523 10.102-10.102s-4.523-10.102-10.102-10.102h-16.668c-5.579 0-10.102 4.523-10.102 10.102s4.523 10.102 10.102 10.102z" />
                </svg>
                {content.ambulans}
              </button>
              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="Patolog"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center  mr-3 mb-2"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 459.993 459.993"
                  fill="white"
                >
                  <circle cx="232.075" cy="78.755" r="8.951" />
                  <path d="M440.745 444.993H389.77v-15.368c0-35.193-9.385-62.355-27.894-80.732-23.593-23.424-53.203-23.475-54.407-23.474h-37.572v-22.734c0-.396-.04-.783-.099-1.163 24.057-9.94 39.261-26.521 48.52-40.897 14.433-22.41 17.689-43.977 17.82-44.883.052-.357.078-.716.078-1.077v-1.606c5.268-1.299 9.85-4.017 13.489-8.046 10.619-11.757 10.001-30.306 9.244-37.734-.577-5.655-3.135-10.4-7.398-13.723-3.045-2.373-6.612-3.737-10.054-4.497V74.917c0-24.675-10.201-41.169-31.185-50.424-8.509-3.752-6.268-11.918-5.402-14.27a7.5 7.5 0 0 0-12.328-7.99c-11.883 12.052-24.456 11.734-47.278 11.157-15.905-.403-35.696-.904-61.753 2.825-35.786 5.119-51.659 27.232-58.673 44.881-7.027 17.684-6.599 34.197-6.501 36.481v49.109c0 .797.127 1.564.357 2.285-3.568.741-7.3 2.116-10.467 4.584-4.263 3.322-6.822 8.067-7.399 13.723-.757 7.429-1.374 25.978 9.245 37.734 3.679 4.074 8.326 6.804 13.668 8.085v1.567c0 .36.026.72.078 1.076.131.907 3.387 22.474 17.82 44.884 9.258 14.375 24.462 30.956 48.518 40.896-.059.38-.099.767-.099 1.164v22.734h-37.517c-1.227.008-30.869.051-54.46 23.474-18.509 18.377-27.894 45.54-27.894 80.732v15.368H19.248a7.5 7.5 0 0 0 0 15h421.497a7.5 7.5 0 0 0 0-14.999zM315.387 89.913c-.448-.366-2.322-1.798-6.253-3.656h17.364v34.77l-8.359-7.867V95.718a7.507 7.507 0 0 0-2.752-5.805zm28.639 78.888c.892 8.739-.072 20.201-5.453 26.158a11.873 11.873 0 0 1-2.357 2.008v-33.594c2.325.268 4.651.865 6.13 2.028.717.563 1.477 1.407 1.68 3.4zM185.674 31.064c24.813-3.55 43.908-3.065 59.249-2.678 17.998.456 32.3.818 45.184-5.784 1.779 6.164 6.028 12.033 14.152 15.616 14.548 6.417 21.306 16.411 22.144 33.039h-53.61c-3.54-19.264-20.445-33.911-40.718-33.911-20.272 0-37.176 14.647-40.717 33.911H137.08c5.332-16.593 18.12-35.833 48.594-40.193zm-52.298 90.3V97.4a7.82 7.82 0 0 0-.011-.405c-.032-.611-.202-4.771.495-10.739h17.236c-3.913 1.85-5.791 3.279-6.251 3.656a7.503 7.503 0 0 0-2.751 5.805v17.441l-8.718 8.206zm125.11-42.607c0 14.563-11.848 26.411-26.411 26.411s-26.41-11.848-26.41-26.411 11.848-26.411 26.41-26.411c14.563 0 26.411 11.848 26.411 26.411zM121.243 194.959c-5.38-5.957-6.345-17.419-5.454-26.158.203-1.993.963-2.837 1.68-3.401 1.518-1.193 3.926-1.794 6.31-2.051v33.729a11.803 11.803 0 0 1-2.536-2.119zm33.344 58.007c-11.735-18.011-15.267-35.842-15.808-38.914v-77.175l15.955-15.015a7.502 7.502 0 0 0 2.36-5.462v-16.384c4.63-2.247 15.324-6.311 35.508-8.743 5.318 16.734 21 28.894 39.472 28.894 18.294 0 33.844-11.928 39.309-28.411 17.774 2.456 27.42 6.154 31.754 8.259V116.4c0 2.068.854 4.044 2.36 5.462l15.718 14.791v77.397c-.548 3.109-4.085 20.922-15.808 38.915-16.809 25.798-41.947 39.985-74.714 42.169H229.3c-32.767-2.183-57.905-16.37-74.713-42.168zm73.982 57.153c.162.01.323.016.485.016h1.886c.162 0 .323-.005.485-.016 8.499-.551 16.299-1.832 23.473-3.668v26.469a7.495 7.495 0 0 0 4.421 6.833l-31.175 32.119-28.084-31.875c2.931-1.02 5.038-3.799 5.038-7.078V306.45c7.172 1.836 14.972 3.118 23.471 3.669zM85.224 429.626c0-88.177 64.527-89.206 67.301-89.206h27.914l41.811 47.453a7.5 7.5 0 0 0 5.447 2.54l.181.002a7.498 7.498 0 0 0 5.381-2.276l46.317-47.718h27.948c.277-.011 24.576.047 43.785 19.118 15.568 15.457 23.462 39.039 23.462 70.088v15.368H192.168V402.83a7.5 7.5 0 0 0-7.5-7.5h-66.673a7.5 7.5 0 0 0-7.5 7.5v42.163H85.224v-15.367zm91.944-10.956h-51.673v-8.34h51.673v8.34zm-51.673 15h51.673v11.323h-51.673V433.67z" />
                  <circle cx="176.76" cy="152.317" r="8.951" />
                  <circle cx="283.235" cy="152.317" r="8.951" />
                  <path d="M228.063 205.045h3.868c9.666 0 17.554-7.664 17.961-17.232.026-.252.039-.509.039-.768v-43.678a7.5 7.5 0 0 0-15 0v43.678c0 1.654-1.346 3-3 3h-3.868c-1.654 0-3-1.346-3-3a7.5 7.5 0 0 0-15 0c0 9.925 8.075 18 18 18zm48.428 40.012a7.5 7.5 0 0 0-11.675-9.417c-.08.1-9.089 9.939-32.971 9.939-24.809 0-36.903-10.295-37.494-10.812a7.5 7.5 0 0 0-10.063 11.123c.658.6 16.468 14.689 47.557 14.689 31.226 0 43.365-13.933 44.646-15.522z" />
                </svg>
                {content.patolog}
              </button>
              <button
                type="button"
                onClick={onClick}
                name="occupation"
                value="Eczaci"
                className="shadow-bg text-white bg-medicus hover:bg-medicus-2 border border-blue-200 focus:ring-4 focus:ring-blue-300  font-medium rounded-md text-sm px-4 py-3 lg:text-lg lg:px-6 lg:py-4 text-center flex flex-col items-center  mr-3 mb-2 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-8 h-8"
                  fill="white"
                >
                  <path d="M493.935 304.691 409.6 256l84.335-48.691a25.6 25.6 0 0 0 9.37-34.978l-51.2-88.678a25.61 25.61 0 0 0-15.548-11.93 25.716 25.716 0 0 0-6.622-.87 25.574 25.574 0 0 0-12.8 3.43L332.8 122.974V25.6c0-14.14-11.46-25.6-25.6-25.6H204.8c-14.14 0-25.6 11.46-25.6 25.6v97.374L94.865 74.283a25.563 25.563 0 0 0-12.8-3.43c-2.219 0-4.446.29-6.622.87a25.653 25.653 0 0 0-15.548 11.938l-51.2 88.678a25.6 25.6 0 0 0 9.37 34.978L102.4 256l-84.335 48.691a25.6 25.6 0 0 0-9.37 34.978l51.2 88.678a25.606 25.606 0 0 0 22.17 12.8c4.454 0 8.875-1.161 12.8-3.43l84.335-48.691V486.4c0 14.14 11.46 25.6 25.6 25.6h102.4c14.14 0 25.6-11.46 25.6-25.6v-97.374l84.335 48.691a25.563 25.563 0 0 0 12.8 3.43c2.219 0 4.446-.29 6.622-.87a25.609 25.609 0 0 0 15.548-11.93l51.2-88.678a25.6 25.6 0 0 0-9.37-34.978zm-64 110.848L307.2 344.678V486.4H204.8V344.678L82.065 415.539l-51.2-88.678L153.6 256 30.865 185.139l51.2-88.678L204.8 167.322V25.6h102.4v141.722l122.735-70.861 51.2 88.678L358.4 256l122.735 70.861-51.2 88.678z" />
                </svg>
                {content.eczaci}
              </button>
            </>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="grid place-items-center md:justify-start pb-4 fadeinup">
          <div className="text-center">
            <button
              onClick={onClick}
              name="education"
              value="3"
              type="button"
              className={buttonStyle}
            >
              <AcademicCapIcon className="h-6 w-6 mr-2" aria-hidden="true" />2{' '}
              {content.yil}
            </button>

            <button
              onClick={onClick}
              name="education"
              value="4"
              type="button"
              className={buttonStyle}
            >
              <AcademicCapIcon className="h-6 w-6 mr-2" aria-hidden="true" />4{' '}
              {content.yil}
            </button>

            <button
              onClick={onClick}
              name="education"
              value="5"
              type="button"
              className={buttonStyle}
            >
              <AcademicCapIcon className="h-6 w-6 mr-2" aria-hidden="true" />4{' '}
              {content.yildanFazla}
            </button>
          </div>
          <div className="grid place-items-center">
            <p className="my-4 text-center">{content.detay}</p>

            <select
              onChange={handleSelect}
              defaultValue={'default'}
              className="py-2 px-4  w-full rounded-sm border bg-white text-gray-700 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
            >
              <option value={'default'} disabled>
                Lütfen seçiniz.
              </option>
              {universiteler.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="mt-8">
              <button
                type="button"
                onClick={
                  formData.education !== '' && formData.univercity !== ''
                    ? onClick
                    : () => setError(errorEducation)
                }
                className="transition inline-flex duration-500 ease hover:bg-blue-900 inline-block bg-medicus font-medium rounded-full text-white px-4 py-2 cursor-pointer"
              >
                <CheckIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                {content.tamam}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-wrap justify-center md:justify-start pb-4 fadeinup">
          <button
            onClick={onClick}
            name="experience"
            value="0"
            type="button"
            className={buttonStyle}
          >
            <MinusCircleIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            {content.deneyimsiz}
          </button>
          <button
            onClick={onClick}
            name="experience"
            value="2"
            type="button"
            className={buttonStyle}
          >
            <ClockIcon className="h-6 w-6 mr-2" aria-hidden="true" />2{' '}
            {content.yil}
          </button>

          <button
            onClick={onClick}
            name="experience"
            value="3"
            type="button"
            className={buttonStyle}
          >
            <ClockIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            2-5 {content.yil}
          </button>

          <button
            onClick={onClick}
            name="experience"
            value="5"
            type="button"
            className={buttonStyle}
          >
            <ClockIcon className="h-6 w-6 mr-2" aria-hidden="true" />5{' '}
            {content.yildanFazla}
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-wrap justify-center md:justify-start pb-4 fadeinup">
          <button
            onClick={onClick}
            name="languageLevel"
            value="1"
            type="button"
            className={buttonStyle}
          >
            <MinusCircleIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            {content.hic}
          </button>

          <button
            onClick={onClick}
            name="languageLevel"
            value="2"
            type="button"
            className={buttonStyle}
          >
            <GlobeAltIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            A1
          </button>

          <button
            onClick={onClick}
            name="languageLevel"
            value="3"
            type="button"
            className={buttonStyle}
          >
            <GlobeAltIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            A2
          </button>

          <button
            onClick={onClick}
            name="languageLevel"
            value="4"
            type="button"
            className={buttonStyle}
          >
            <GlobeAltIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            B1
          </button>

          <button
            onClick={onClick}
            name="languageLevel"
            value="5"
            type="button"
            className={buttonStyle}
          >
            <GlobeAltIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            B2
          </button>

          <button
            onClick={onClick}
            name="languageLevel"
            value="6"
            type="button"
            className={buttonStyle}
          >
            <GlobeAltIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            C1
          </button>
        </div>
      )}

      {/* {step === 5 && (
        <div className="grid place-items-center">
          <div className="flex flex-wrap justify-center md:justify-start fadeinup">
            <button
              onClick={() => setShowCity(true)}
              name="city"
              value="Evet"
              type="button"
              className={buttonStyle}
            >
              <CheckCircleIcon className="h-6 w-6 mr-2" aria-hidden="true" />
              {content.evet}
            </button>

            <button
              onClick={onClick}
              name="city"
              value="Hayir"
              type="button"
              className={buttonStyle}
            >
              <XCircleIcon className="h-6 w-6 mr-2" aria-hidden="true" />
              {content.hayir}
            </button>
          </div>

          {showCity && (
            <div className="grid place-items-center">
              <p className="my-4 text-center">{content.sehir}</p>
              <input
                type="text"
                value={formData.city}
                onChange={onInputChange}
                className="py-2 px-4 w-full rounded-sm border bg-white text-gray-700 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                name="city"
                placeholder="Berlin, Munih..."
                required
              />

              <div className="mt-8">
                <button
                  type="button"
                  onClick={
                    formData.city !== '' ? onClick : () => setError(errorCity)
                  }
                  className="transition inline-flex duration-500 ease hover:bg-blue-900 inline-block bg-medicus font-medium rounded-full text-white px-4 py-2 cursor-pointer"
                >
                  <CheckIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                  {content.tamam}
                </button>
              </div>
            </div>
          )}
        </div>
      )} */}

      {step === 5 && (
        <div className="grid place-items-center md:justify-start pb-4 fadeinup">
          <div className="md:max-w-[50%] w-full">
            <input
              type="text"
              value={formData.firstName}
              onChange={onInputChange}
              className="my-2 py-2 min-w-[300px] px-4  w-full rounded-sm border bg-white text-gray-700 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              name="firstName"
              placeholder="Adınız"
            />
            <input
              type="text"
              value={formData.lastName}
              onChange={onInputChange}
              className="my-2 py-2 min-w-[300px] px-4  w-full rounded-sm border bg-white text-gray-700 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              name="lastName"
              placeholder="Soyadınız"
            />
            <input
              type="text"
              value={formData.contactNumber}
              onChange={onInputChange}
              className="my-2 py-2 min-w-[300px] px-4  w-full rounded-sm border bg-white text-gray-700 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              name="contactNumber"
              inputMode="tel"
              placeholder="Telefon numaranız"
            />
            <input
              type="text"
              value={formData.email}
              onChange={onInputChange}
              className="my-2 py-2 min-w-[300px] px-4  w-full rounded-sm border bg-white text-gray-700 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              name="email"
              inputMode="email"
              placeholder="E-posta"
            />
          </div>
          <div className="my-2">
            <input
              checked={formData.terms}
              onChange={onInputChange}
              type="checkbox"
              id="terms"
              name="terms"
              value="true"
              className="mr-3 p-4 w-4 h-4"
            />
            <label className="text-gray-500 cursor-pointer" htmlFor="terms">
              <Link href="/genel-sartlar-ve-kosullar">
                <a className="border-b" target="_blank">
                  {content.terms1}
                </a>
              </Link>{' '}
              {content.okudum}
            </label>
          </div>

          <div className="my-2">
            <input
              checked={formData.kvp}
              onChange={onInputChange}
              type="checkbox"
              id="kvp"
              name="kvp"
              value="true"
              className="mr-3 p-4 w-4 h-4"
            />
            <label className="text-gray-500 cursor-pointer" htmlFor="kvp">
              <Link href="/gizlilik-politikasi">
                <a className="border-b" target="_blank">
                  {content.terms2}
                </a>
              </Link>{' '}
              {content.okudum}
            </label>
          </div>
          <div className="my-2">
            <input
              checked={formData.gdpr}
              onChange={onInputChange}
              type="checkbox"
              id="gdpr"
              name="gdpr"
              value="true"
              className="mr-3 p-4 w-4 h-4"
            />
            <label className="text-gray-500 cursor-pointer" htmlFor="gdpr">
              {content.terms3}
            </label>
          </div>

          <div className="mt-8">
            <button
              type="button"
              disabled={error}
              onClick={handlePostSubmission}
              className="transition inline-flex duration-500 ease hover:bg-blue-900 inline-block bg-medicus text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
            >
              <CheckIcon className="h-6 w-6 mr-2" aria-hidden="true" />
              {content.gonder}
            </button>
          </div>
        </div>
      )}
      {showSuccessMessage && (
        <span className="text-xl float-right mb-24 text-gray-500 text-center">
          {content.ulasti}
          <br /> <br />
          Kısa süre içinde daha fazla bilgi içeren bir <strong>e-posta </strong>
          alacaksınız.
        </span>
      )}
      {error && <p className="text-s text-center text-red-500">{error}</p>}
    </div>
  )
}

export default ApplicationForm
