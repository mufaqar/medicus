/* eslint-disable max-len */
import React from 'react'
import Image from 'next/image'

export const grpahCMSImageLoader = ({ src }) => src
export const getContentFragment = (index, text, obj, type) => {

  let modifiedText = text

  if (obj) {
    if (obj.bold || obj.strong) {
      modifiedText = <b key={index}>{text}</b>
    }

    if (obj.italic) {
      modifiedText = <em key={index}>{text}</em>
    }

    if (obj.underline) {
      modifiedText = <u key={index}>{text}</u>
    }

    if (obj.type === 'list-item') {
      modifiedText = <li key={index}>{obj.children[0].children[0].text}</li>
    }

    if (obj.href) {
      modifiedText = <a key={index} href={obj.href} target='_blank' rel="noreferrer">{obj.children[0].text}</a>
    }
  }

  switch (type) {
    case 'heading-two':
      return (
        <h3 key={index} className="text-xl font-semibold mb-4">
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h3>
      )
    case 'heading-three':
      return (
        <h3 key={index} className="text-xl font-semibold mb-4">
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h3>
      )
    case 'iframe':
      return <iframe width={obj.width} height={obj.height} src={obj.url} />
    case 'paragraph':
      return (
        <p key={index} className="mb-4">
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </p>
      )
      case 'link':

        return (
          <React.Fragment  key={index}>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </React.Fragment >
        )
    case 'heading-four':
      return (
        <h4 key={index} className="text-md font-semibold mb-4">
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h4>
      )
    case 'bulleted-list':
      return (
        <ul key={index} className="text-md mb-4 list-disc">
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </ul>
      )
    case 'image':
      return (
        <Image
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
          quality={50}
          loading="lazy"
        />
      )
    default:
      return modifiedText
  }
}

export function validate(values) {
  const errors = {}

  const error = 'Bu alan gereklidir'
  const errorName = 'Lutfen gecerli bir isim giriniz'
  const errorSurname = 'Lutfen gecerli bir soyad giriniz'
  const errorCity = 'Lutfen gecerli bir sehir adi giriniz'
  const errorEmail = 'Lutfen geçerli bir e-posta adresi giriniz'
  const errorPhone = 'Telefon numaraniz en az 7 karakterli olmalidir'
  const errorEducation = 'Lutfen daha fazla detay giriniz'

  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  )

  if (!values.firstName) {
    errors.firstName = error
  } else if (!/^[A-Za-z]+/.test(values.firstName.trim())) {
    errors.firstName = errorName
  }

  if (!values.lastName) {
    errors.lastName = error
  } else if (!/^[A-Za-z]+/.test(values.lastName.trim())) {
    errors.lastName = errorSurname
  }

  if (!values.city) {
    errors.city = error
  } else if (!/^[A-Za-z]+/.test(values.city.trim())) {
    errors.city = errorCity
  }

  if (!values.email) {
    errors.email = error
  } else if (!pattern.test(values.email)) {
    errors.email = errorEmail
  }

  if (!values.contactNumber) {
    errors.contactNumber = error
  } else if (values.contactNumber.length < 9) {
    errors.contactNumber = errorPhone
  }

  if (!values.education) {
    errors.education = error
  } else if (values.education.length < 6) {
    errors.education = errorEducation
  }

  if (!values.terms || !values.languageLevel || !values.occupation) {
    errors.terms = error
  }

  return errors
}

export const universiteler = [
  'ABDULLAH GÜL ÜNİVERSİTESİ',
  'ACIBADEM MEHMET ALİ AYDINLAR ÜNİVERSİTESİ',
  'ADANA ALPARSLAN TÜRKEŞ BİLİM VE TEKNOLOJİ ÜNİVERSİTESİ',
  'ADIYAMAN ÜNİVERSİTESİ',
  'AFYON KOCATEPE ÜNİVERSİTESİ',
  'AFYONKARAHİSAR SAĞLIK BİLİMLERİ ÜNİVERSİTESİ',
  'AĞRI İBRAHİM ÇEÇEN ÜNİVERSİTESİ',
  'AKDENİZ ÜNİVERSİTESİ',
  'AKSARAY ÜNİVERSİTESİ',
  'ALANYA ALAADDİN KEYKUBAT ÜNİVERSİTESİ',
  'ALTINBAŞ ÜNİVERSİTESİ',
  'AMASYA ÜNİVERSİTESİ',
  'ANADOLU ÜNİVERSİTESİ',
  'ANKA TEKNOLOJİ ÜNİVERSİTESİ',
  'ANKARA BİLİM ÜNİVERSİTESİ',
  'ANKARA HACI BAYRAM VELİ ÜNİVERSİTESİ',
  'ANKARA MEDİPOL ÜNİVERSİTESİ',
  'ANKARA MÜZİK VE GÜZEL SANATLAR ÜNİVERSİTESİ',
  'ANKARA SOSYAL BİLİMLER ÜNİVERSİTESİ',
  'ANKARA ÜNİVERSİTESİ',
  'ANKARA YILDIRIM BEYAZIT ÜNİVERSİTESİ',
  'ANTALYA AKEV ÜNİVERSİTESİ',
  'ANTALYA BİLİM ÜNİVERSİTESİ',
  'ARDAHAN ÜNİVERSİTESİ',
  'ARTVİN ÇORUH ÜNİVERSİTESİ',
  'ATAŞEHİR ADIGÜZEL MESLEK YÜKSEKOKULU',
  'ATATÜRK ÜNİVERSİTESİ',
  'ATILIM ÜNİVERSİTESİ',
  'AVRASYA ÜNİVERSİTESİ',
  'AYDIN ADNAN MENDERES ÜNİVERSİTESİ',
  'BAHÇEŞEHİR ÜNİVERSİTESİ',
  'BALIKESİR ÜNİVERSİTESİ',
  'BANDIRMA ONYEDİ EYLÜL ÜNİVERSİTESİ',
  'BARTIN ÜNİVERSİTESİ',
  'BAŞKENT ÜNİVERSİTESİ',
  'BATMAN ÜNİVERSİTESİ',
  'BAYBURT ÜNİVERSİTESİ',
  'BEYKENT ÜNİVERSİTESİ',
  'BEYKOZ ÜNİVERSİTESİ',
  'BEZM-İ ÂLEM VAKIF ÜNİVERSİTESİ',
  'BİLECİK ŞEYH EDEBALİ ÜNİVERSİTESİ',
  'BİNGÖL ÜNİVERSİTESİ',
  'BİRUNİ ÜNİVERSİTESİ',
  'BİTLİS EREN ÜNİVERSİTESİ',
  'BOĞAZİÇİ ÜNİVERSİTESİ',
  'BOLU ABANT İZZET BAYSAL ÜNİVERSİTESİ',
  'BURDUR MEHMET AKİF ERSOY ÜNİVERSİTESİ',
  'BURSA TEKNİK ÜNİVERSİTESİ',
  'BURSA ULUDAĞ ÜNİVERSİTESİ',
  'ÇAĞ ÜNİVERSİTESİ',
  'ÇANAKKALE ONSEKİZ MART ÜNİVERSİTESİ',
  'ÇANKAYA ÜNİVERSİTESİ',
  'ÇANKIRI KARATEKİN ÜNİVERSİTESİ',
  'ÇUKUROVA ÜNİVERSİTESİ',
  'DEMİROĞLU BİLİM ÜNİVERSİTESİ',
  'DİCLE ÜNİVERSİTESİ',
  'DOĞUŞ ÜNİVERSİTESİ',
  'DOKUZ EYLÜL ÜNİVERSİTESİ',
  'DÜZCE ÜNİVERSİTESİ',
  'EGE ÜNİVERSİTESİ',
  'ERCİYES ÜNİVERSİTESİ',
  'ERZİNCAN BİNALİ YILDIRIM ÜNİVERSİTESİ',
  'ERZURUM TEKNİK ÜNİVERSİTESİ',
  'ESKİŞEHİR OSMANGAZİ ÜNİVERSİTESİ',
  'ESKİŞEHİR TEKNİK ÜNİVERSİTESİ',
  'FATİH SULTAN MEHMET VAKIF ÜNİVERSİTESİ',
  'FENERBAHÇE ÜNİVERSİTESİ',
  'FIRAT ÜNİVERSİTESİ',
  'GALATASARAY ÜNİVERSİTESİ',
  'GAZİ ÜNİVERSİTESİ',
  'GAZİANTEP İSLAM BİLİM VE TEKNOLOJİ ÜNİVERSİTESİ',
  'GAZİANTEP ÜNİVERSİTESİ',
  'GEBZE TEKNİK ÜNİVERSİTESİ',
  'GİRESUN ÜNİVERSİTESİ',
  'GÜMÜŞHANE ÜNİVERSİTESİ',
  'HACETTEPE ÜNİVERSİTESİ',
  'HAKKARİ ÜNİVERSİTESİ',
  'HALİÇ ÜNİVERSİTESİ',
  'HARRAN ÜNİVERSİTESİ',
  'HASAN KALYONCU ÜNİVERSİTESİ',
  'HATAY MUSTAFA KEMAL ÜNİVERSİTESİ',
  'HİTİT ÜNİVERSİTESİ',
  'IĞDIR ÜNİVERSİTESİ',
  'ISPARTA UYGULAMALI BİLİMLER ÜNİVERSİTESİ',
  'IŞIK ÜNİVERSİTESİ',
  'İBN HALDUN ÜNİVERSİTESİ',
  'İHSAN DOĞRAMACI BİLKENT ÜNİVERSİTESİ',
  'İNÖNÜ ÜNİVERSİTESİ',
  'İSKENDERUN TEKNİK ÜNİVERSİTESİ',
  'İSTANBUL ATLAS ÜNİVERSİTESİ',
  'İSTANBUL AYDIN ÜNİVERSİTESİ',
  'İSTANBUL AYVANSARAY ÜNİVERSİTESİ',
  'İSTANBUL BİLGİ ÜNİVERSİTESİ',
  'İSTANBUL ESENYURT ÜNİVERSİTESİ',
  'İSTANBUL GALATA ÜNİVERSİTESİ',
  'İSTANBUL GEDİK ÜNİVERSİTESİ',
  'İSTANBUL GELİŞİM ÜNİVERSİTESİ',
  'İSTANBUL KENT ÜNİVERSİTESİ',
  'İSTANBUL KÜLTÜR ÜNİVERSİTESİ',
  'İSTANBUL MEDENİYET ÜNİVERSİTESİ',
  'İSTANBUL MEDİPOL ÜNİVERSİTESİ',
  'İSTANBUL OKAN ÜNİVERSİTESİ',
  'İSTANBUL RUMELİ ÜNİVERSİTESİ',
  'İSTANBUL SABAHATTİN ZAİM ÜNİVERSİTESİ',
  'İSTANBUL SAĞLIK VE SOSYAL BİLİMLER MESLEK YÜKSEKOKULU',
  'İSTANBUL SAĞLIK VE TEKNOLOJİ ÜNİVERSİTESİ',
  'İSTANBUL ŞİŞLİ MESLEK YÜKSEKOKULU',
  'İSTANBUL TEKNİK ÜNİVERSİTESİ',
  'İSTANBUL TİCARET ÜNİVERSİTESİ',
  'İSTANBUL ÜNİVERSİTESİ',
  'İSTANBUL ÜNİVERSİTESİ-CERRAHPAŞA',
  'İSTANBUL YENİ YÜZYIL ÜNİVERSİTESİ',
  'İSTANBUL 29 MAYIS ÜNİVERSİTESİ',
  'İSTİNYE ÜNİVERSİTESİ',
  'İZMİR BAKIRÇAY ÜNİVERSİTESİ',
  'İZMİR DEMOKRASİ ÜNİVERSİTESİ',
  'İZMİR EKONOMİ ÜNİVERSİTESİ',
  'İZMİR KATİP ÇELEBİ ÜNİVERSİTESİ',
  'İZMİR KAVRAM MESLEK YÜKSEKOKULU',
  'İZMİR TINAZTEPE ÜNİVERSİTESİ',
  'İZMİR YÜKSEK TEKNOLOJİ ENSTİTÜSÜ',
  'KADİR HAS ÜNİVERSİTESİ',
  'KAFKAS ÜNİVERSİTESİ',
  'KAHRAMANMARAŞ İSTİKLAL ÜNİVERSİTESİ',
  'KAHRAMANMARAŞ SÜTÇÜ İMAM ÜNİVERSİTESİ',
  'KAPADOKYA ÜNİVERSİTESİ',
  'KARABÜK ÜNİVERSİTESİ',
  'KARADENİZ TEKNİK ÜNİVERSİTESİ',
  'MEHMETBEY ÜNİVERSİTESİ',
  'KASTAMONU ÜNİVERSİTESİ',
  'KAYSERİ ÜNİVERSİTESİ',
  'KIRIKKALE ÜNİVERSİTESİ',
  'KIRKLARELİ ÜNİVERSİTESİ',
  'KIRŞEHİR AHİ EVRAN ÜNİVERSİTESİ',
  'KİLİS 7 ARALIK ÜNİVERSİTESİ',
  'KOCAELİ SAĞLIK VE TEKNOLOJİ ÜNİVERSİTESİ',
  'KOCAELİ ÜNİVERSİTESİ',
  'KOÇ ÜNİVERSİTESİ',
  'KONYA GIDA VE TARIM ÜNİVERSİTESİ',
  'KONYA TEKNİK ÜNİVERSİTESİ',
  'KTO KARATAY ÜNİVERSİTESİ',
  'KÜTAHYA DUMLUPINAR ÜNİVERSİTESİ',
  'KÜTAHYA SAĞLIK BİLİMLERİ ÜNİVERSİTESİ',
  'LOKMAN HEKİM ÜNİVERSİTESİ',
  'MALATYA TURGUT ÖZAL ÜNİVERSİTESİ',
  'MALTEPE ÜNİVERSİTESİ',
  'MANİSA CELÂL BAYAR ÜNİVERSİTESİ',
  'MARDİN ARTUKLU ÜNİVERSİTESİ',
  'MARMARA ÜNİVERSİTESİ',
  'MEF ÜNİVERSİTESİ',
  'MERSİN ÜNİVERSİTESİ',
  'MİMAR SİNAN GÜZEL SANATLAR ÜNİVERSİTESİ',
  'MUĞLA SITKI KOÇMAN ÜNİVERSİTESİ',
  'MUNZUR ÜNİVERSİTESİ',
  'MUŞ ALPARSLAN ÜNİVERSİTESİ',
  'NECMETTİN ERBAKAN ÜNİVERSİTESİ',
  'NEVŞEHİR HACI BEKTAŞ VELİ ÜNİVERSİTESİ',
  'NİĞDE ÖMER HALİSDEMİR ÜNİVERSİTESİ',
  'NİŞANTAŞI ÜNİVERSİTESİ',
  'NUH NACİ YAZGAN ÜNİVERSİTESİ',
  'ONDOKUZ MAYIS ÜNİVERSİTESİ',
  'ORDU ÜNİVERSİTESİ',
  'ORTA DOĞU TEKNİK ÜNİVERSİTESİ',
  'OSMANİYE KORKUT ATA ÜNİVERSİTESİ',
  'OSTİM TEKNİK ÜNİVERSİTESİ',
  'ÖZYEĞİN ÜNİVERSİTESİ',
  'PAMUKKALE ÜNİVERSİTESİ',
  'PİRİ REİS ÜNİVERSİTESİ',
  'RECEP TAYYİP ERDOĞAN ÜNİVERSİTESİ',
  'SABANCI ÜNİVERSİTESİ',
  'SAĞLIK BİLİMLERİ ÜNİVERSİTESİ',
  'SAKARYA UYGULAMALI BİLİMLER ÜNİVERSİTESİ',
  'SAKARYA ÜNİVERSİTESİ',
  'SAMSUN ÜNİVERSİTESİ',
  'SANKO ÜNİVERSİTESİ',
  'SELÇUK ÜNİVERSİTESİ',
  'SİİRT ÜNİVERSİTESİ',
  'SİNOP ÜNİVERSİTESİ',
  'SİVAS BİLİM VE TEKNOLOJİ ÜNİVERSİTESİ',
  'SİVAS CUMHURİYET ÜNİVERSİTESİ',
  'SÜLEYMAN DEMİREL ÜNİVERSİTESİ',
  'ŞIRNAK ÜNİVERSİTESİ',
  'TARSUS ÜNİVERSİTESİ',
  'TED ÜNİVERSİTESİ',
  'TEKİRDAĞ NAMIK KEMAL ÜNİVERSİTESİ',
  'TOBB EKONOMİ VE TEKNOLOJİ ÜNİVERSİTESİ',
  'TOKAT GAZİOSMANPAŞA ÜNİVERSİTESİ',
  'TOROS ÜNİVERSİTESİ',
  'TRABZON ÜNİVERSİTESİ',
  'TRAKYA ÜNİVERSİTESİ',
  'TÜRK HAVA KURUMU ÜNİVERSİTESİ',
  'TÜRK-ALMAN ÜNİVERSİTESİ',
  'TÜRKİYE ULUSLARARASI İSLAM, BİLİM VE TEKNOLOJİ ÜNİVERSİTESİ',
  'TÜRK-JAPON BİLİM VE TEKNOLOJİ ÜNİVERSİTESİ',
  'UFUK ÜNİVERSİTESİ',
  'UŞAK ÜNİVERSİTESİ',
  'ÜSKÜDAR ÜNİVERSİTESİ',
  'VAN YÜZÜNCÜ YIL ÜNİVERSİTESİ',
  'YALOVA ÜNİVERSİTESİ',
  'YAŞAR ÜNİVERSİTESİ',
  'YEDİTEPE ÜNİVERSİTESİ',
  'YILDIZ TEKNİK ÜNİVERSİTESİ',
  'YOZGAT BOZOK ÜNİVERSİTESİ',
  'YÜKSEK İHTİSAS ÜNİVERSİTESİ',
  'ZONGULDAK BÜLENT ECEVİT ÜNİVERSİTESİ',
  'DİĞER'
]

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })
}