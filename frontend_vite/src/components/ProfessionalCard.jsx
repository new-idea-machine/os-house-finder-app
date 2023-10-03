import React from 'react';

function ProfessionalCard(props) {
  const name = props.name;
  const title = props.title;
  const description = props.description;
  const image = props.image;

  return (
    <div className="px-5">
      <img className="mx-auto" src={image} width={200} alt="Shirt" />
      <p className="text-center fw-bold pt-3">{name}</p>
      <p className="text-center fw-bold">{title}</p>
      <p className="text-center fw-bold">{description}</p>
    </div>
  );
}

export default ProfessionalCard;
