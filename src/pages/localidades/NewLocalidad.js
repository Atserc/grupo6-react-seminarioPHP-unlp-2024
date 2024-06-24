import { LocalidadForm } from '../../components/organisms'

const NewLocalidad = () => {
  return (
    <LocalidadForm
      link={`localidades`}
      method="POST"
      titleMessage="Crear Localidad"
      buttonMessage="Confirmar"
    />
  )
}

export default NewLocalidad