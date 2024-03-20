const ModalInsert: React.FC<ModalFormularioProps> = ({ showModal, onClose }) => {
    // Agregar una clase 'show' al modal solo cuando showModal sea verdadero
    const modalClass = showModal ? 'modal fade show d-block' : 'modal fade';

    return (
        <>
            {/* Fondo oscurecido */}
            <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ zIndex: showModal ? 1040 : -1 }}></div>

            {/* Modal */}
            <div className={modalClass} style={{ display: showModal ? 'block' : 'none', zIndex: showModal ? 1050 : -1 }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title">Agregar tarea</h5>
                            <button type="button" className="close" onClick={onClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Nombre:</label>
                                    <input type="text" className="form-control" id="name" name="name" required placeholder="Ingresa el nombre de la tarea" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descriptiom">Descripción:</label>
                                    <input type="text" className="form-control" id="description" name="description" required placeholder="Ingresa una descripción de la tarea" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="deadline">Fecha de vencimiento:</label>
                                    <input type="date" className="form-control" id="deadline" name="deadline" required placeholder="Ingresa la fecha de vencimiento de la tarea" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Estatus:</label>
                                    <select className="form-select" >
                                    <option disabled selected value="">asasdasdasd</option>
                                        <hr />
                                        <option value="opcion1">Completa</option>
                                        <option value="opcion2">Pendiente</option>
                                        <option value="opcion3">Incompleta</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priority">Prioridad:</label>
                                    <select className="form-select" >
                                        
                                        <option value="opcion1">Alta</option>
                                        <option value="opcion2">Media</option>
                                        <option value="opcion3">Baja</option>
                                    </select>
                                </div>
                                <div className="d-flex justify-content-end"> 
                                    <button type="button" className="btn btn-primary me-2" onClick={onClose}>Cerrar</button>
                                    <button type="submit" className="btn btn-secondary">Agregar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalInsert;

interface ModalFormularioProps {
    showModal: boolean;
    onClose: () => void;
}