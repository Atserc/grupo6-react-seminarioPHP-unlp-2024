import { TipoPropiedadForm } from '../../components/organisms'

const NewTipoPropiedad = () => {
  return (
    <TipoPropiedadForm
      link={`tipos_propiedad`}
      method="POST"
      titleMessage="Crear Tipo de Propiedad"
      buttonMessage="Confirmar"
    />
  )
}

export default NewTipoPropiedad