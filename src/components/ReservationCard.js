export default function ReservationCard(reservation) {
  const { workspace, date, startHour, endHour, reason, status, id } = reservation;
  return `
    <article
      class="rounded"
    >
      <h3 class="font-bold text-lg">
        ${workspace}
      </h3>

      <div class="">

        <p>
          Fecha:
          ${date}
        </p>

        <p>
          Horario:
          ${startHour}
          -
          ${endHour}
        </p>

        <p>
          Motivo:
          ${reason}
        </p>

        <p>
          Estado:
          <span class="">
            ${status}
          </span>
        </p>
        <button
          class="mt-3 bg-blue-600 text-white px-4 py-2 rounded" id="btnEdit" data-id="${id}"
        >
          Editar
        </button>
        <button
          class="mt-3 bg-blue-600 text-white px-4 py-2 rounded" id="btnDelete" data-id="${id}"
        >
          Eliminar
        </button>
      </div>
    </article>
  `;
}
