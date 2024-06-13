import React, { useEffect, useState } from 'react';
import { getData } from '../../utils/requests';
import { GridDiv, EditRedirectButton, DeleteButton, AddButton, LoadingSpinner } from '../../components/organisms';
import { Link } from 'react-router-dom';

function showData(data, setLoading) {
  return (
    <div className="relative">
      <GridDiv>
        {data.map((tipoPropiedad) => (
          <div key={tipoPropiedad.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 p-6 transition-transform transform hover:scale-105">
            <div className="flex justify-between items-center text-sm">
              <p>Tipo Propiedad: {tipoPropiedad.nombre}</p>
              <div className="flex gap-1">
                <DeleteButton entityId={tipoPropiedad.id} type="tipos_propiedad" setLoading={setLoading}>Eliminar</DeleteButton>
                <EditRedirectButton>
                  <Link to={`/tipo-propiedades/editar/${tipoPropiedad.id}`}> Editar </Link>
                </EditRedirectButton>
              </div>
            </div>
          </div>
        ))}
      </GridDiv>
      <AddButton>
        <Link to='/tipo-propiedades/crear'> Agregar </Link>
      </AddButton>
    </div>
  );
}

function TipoPropiedadPage() {
  const [tipoPropiedades, setTipoPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData({ link: 'tipos_propiedad', setData: setTipoPropiedades, setLoading: setLoading });
  }, []);

  return (
    <div>
      {loading ? <LoadingSpinner /> : showData(tipoPropiedades, setLoading)}
    </div>
  );
}

export default TipoPropiedadPage;
