import React, { useRef, useState } from "react";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Tooltip, notification } from "antd";
import Highlighter from "react-highlight-words";
import { useApi } from "../../../hooks/useApi";
import PhaseModal_Admin from "./modals/PhaseModal_Admin";

export default function PhasesRegistrationScreen_Admin() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [modalState, setModalState] = useState({
        add: false,
        edit: false,
        details: false,
    });
    const [selectedPhase, setSelectedPhase] = useState(null);

    const searchInput = useRef(null);
    const [api, contextHolder] = notification.useNotification();

    // Hook de API para fases
    const {
        data: phasesData,
        loading: loadingPhases,
        fetchData: fetchPhases,
        deleteData: deletePhase,
    } = useApi("/phases");

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Buscar...`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        className="btn-buscar"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button
                        className="btn-limpiar"
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Limpiar
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filtrar
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        Cerrar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#0B733E" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const openModal = (type, phase = null) => {
        setModalState({ add: false, edit: false, details: false, [type]: true });
        setSelectedPhase(phase);
    };

    const closeModal = (type) => {
        setModalState((prev) => ({ ...prev, [type]: false }));
        setSelectedPhase(null);
    };

    const handleSavePhase = async () => {
        await fetchPhases();
        closeModal("add");
        closeModal("edit");
    };

    const handleDelete = async (record) => {
        try {
            await deletePhase(record.id_phase);
            api.success({
                title: "Fase eliminada",
                description: `La fase "${record.name}" ha sido eliminada correctamente`,
                placement: "topRight",
            });
        } catch (error) {
            api.error({
                title: "Error al eliminar",
                description: error.message || "No se pudo eliminar la fase",
                placement: "topRight",
            });
        }
    };

    const handleEdit = (record) => {
        openModal("edit", record);
    };

    const handleView = (record) => {
        openModal("details", record);
    };

    // Transformar datos para la tabla
    const dataSource =
        phasesData
            ?.map((phase) => ({
                key: phase.id_phase,
                id_phase: phase.id_phase,
                name: phase.name,
                order: phase.order,
                userEmail: phase.userEmail,
            }))
            .sort((a, b) => a.order - b.order) || [];

    const columns = [
        {
            title: "Orden",
            dataIndex: "order",
            key: "order",
            align: "center",
            width: 100,
            sorter: (a, b) => a.order - b.order,
            render: (order) => (
                <Tag color="blue" style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {order}
                </Tag>
            ),
        },
        {
            title: "Nombre de la Fase",
            dataIndex: "name",
            key: "name",
            align: "center",
            ...getColumnSearchProps("name"),
        },
        {
            title: "Acciones",
            key: "acciones",
            align: "center",
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Editar" color="green">
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                            style={{ color: "#52c41a" }}
                        />
                    </Tooltip>
                    <Tooltip title="Eliminar" color="red">
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-3 sm:p-4">
            {contextHolder}

            {/* Encabezado */}
            <div className="bg-linear-to-r from-blue-600 to-blue-800 rounded-lg p-4 sm:p-6 mb-6 shadow-lg">
                <div className="flex flex-row justify-between items-center gap-3">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 truncate">
                            Fases del torneo
                        </h1>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => openModal("add")}
                        className="bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-md shrink-0">
                        <span className="hidden sm:inline">Agregar Fase</span>
                        <span className="sm:hidden">Agregar</span>
                    </Button>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loadingPhases}
                    scroll={{ x: "max-content" }}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} fases`,
                    }}
                    locale={{
                        emptyText: () => {
                            if (!loadingPhases && phasesData?.length === 0) {
                                return 'No hay fases registradas aún. Dale en "Agregar Fase" para crear una.';
                            }
                            return "No se encontraron fases";
                        },
                    }}
                />
            </div>

            <PhaseModal_Admin
                visible={modalState.add}
                onClose={() => closeModal("add")}
                onSave={handleSavePhase}
                isEditing={false}
            />

            <PhaseModal_Admin
                visible={modalState.edit}
                onClose={() => closeModal("edit")}
                onSave={handleSavePhase}
                editData={selectedPhase}
                isEditing={true}
            />

        </div>
    );
}