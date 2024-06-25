import React, { useEffect, useState } from 'react';
import { getData } from '../../utils/requests';
import { GridDiv, EditRedirectButton, DeleteButton, LoadingSpinner, Actions } from '../../components/organisms';
import { Link } from 'react-router-dom';

function showData(data, setLoading, refreshData) {
  return (
    <div className="relative">
      <GridDiv>
        {data.map((localidad) => (
          <div key={localidad.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 p-6 transition-transform transform hover:scale-105">
            <div className="flex justify-between items-center text-sm">
              <p>Tipo Propiedad: {localidad.nombre}</p>
              <div className="flex gap-1">
                <DeleteButton onDelete={refreshData} entityId={localidad.id} type="localidades" message="Localidad eliminada correctamente." setLoading={setLoading}>Eliminar</DeleteButton>
                <EditRedirectButton>
                  <Link to={`/localidades/editar/${localidad.id}`}> Editar </Link>
                </EditRedirectButton>
              </div>
            </div>
          </div>
        ))}
      </GridDiv>
    </div>
  );
}

function LocalidadPage() {
  const [localidades, setLocalidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData({ link: 'localidades', setData: setLocalidades, setLoading: setLoading });
  }, []);

  const refreshData = (deleteId) => {
    setLocalidades(localidades => localidades.filter(localidad => localidad.id !== deleteId));
  };

  return (
    <div>
      <Actions link='localidades' label='Agregar Localidad' />
      {loading ? <LoadingSpinner /> : showData(localidades, setLoading, refreshData)}
    </div>
  );
}

export default LocalidadPage;
