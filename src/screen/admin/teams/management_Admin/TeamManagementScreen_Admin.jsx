import React, { useRef, useState } from "react";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FlagOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Tooltip, notification, Avatar } from "antd";
import Highlighter from "react-highlight-words";
import { useApi } from "../../../../hooks/useApi";
import TeamModal_Admin from "./modals/TeamModal_Admin";

export default function TeamManagementScreen_Admin() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [modalState, setModalState] = useState({
        add: false,
        edit: false,
    });
    const [selectedTeam, setSelectedTeam] = useState(null);

    const searchInput = useRef(null);
    const [api, contextHolder] = notification.useNotification();

    // Hook de API para equipos
    const {
        data: teamsData,
        loading: loadingTeams,
        fetchData: fetchTeams,
        deleteData: deleteTeam,
    } = useApi("/team");

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

    const openModal = (type, team = null) => {
        setModalState({ add: false, edit: false, [type]: true });
        setSelectedTeam(team);
    };

    const closeModal = (type) => {
        setModalState((prev) => ({ ...prev, [type]: false }));
        setSelectedTeam(null);
    };

    const handleSaveTeam = async () => {
        await fetchTeams();
        closeModal("add");
        closeModal("edit");
    };

    const handleDelete = async (record) => {
        try {
            await deleteTeam(record.id_team);
            api.success({
                title: "Equipo eliminado",
                description: `El equipo "${record.name}" ha sido eliminado correctamente`,
                placement: "topRight",
            });
        } catch (error) {
            api.error({
                title: "Error al eliminar",
                description: error.message || "No se pudo eliminar el equipo",
                placement: "topRight",
            });
        }
    };

    const handleEdit = (record) => {
        openModal("edit", record);
    };

    // Transformar datos para la tabla
    const dataSource =
        teamsData
            ?.map((team) => ({
                key: team.id_team,
                id_team: team.id_team,
                name: team.name,
                flagUrl: team.flagUrl,
                userEmail: team.userEmail,
            })) || [];

    const columns = [
        {
            title: "Bandera",
            dataIndex: "flagUrl",
            key: "flagUrl",
            align: "center",
            width: 100,
            render: (flagUrl, record) => (
                <Avatar
                    src={flagUrl}
                    alt={record.name}
                    size={48}
                    shape="square"
                    style={{ border: '2px solid #f0f0f0' }}
                    icon={<FlagOutlined />}
                />
            ),
        },
        {
            title: "Nombre del Equipo",
            dataIndex: "name",
            key: "name",
            align: "center",
            ...getColumnSearchProps("name"),
            render: (name) => (
                <span style={{ fontSize: '15px' }}>{name}</span>
            ),
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
                            Gestión de equipos
                        </h1>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => openModal("add")}
                        className="bg-white text-green-600 hover:bg-green-50 border-0 shadow-md shrink-0">
                        <span className="hidden sm:inline">Agregar equipo</span>
                        <span className="sm:hidden">Agregar</span>
                    </Button>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loadingTeams}
                    scroll={{ x: "max-content" }}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} equipos`,
                    }}
                    locale={{
                        emptyText: () => {
                            if (!loadingTeams && teamsData?.length === 0) {
                                return 'No hay equipos registrados aún. Dale en "Agregar Equipo" para crear uno.';
                            }
                            return "No se encontraron equipos";
                        },
                    }}
                />
            </div>

            <TeamModal_Admin
                visible={modalState.add}
                onClose={() => closeModal("add")}
                onSave={handleSaveTeam}
                isEditing={false}
            />

            <TeamModal_Admin
                visible={modalState.edit}
                onClose={() => closeModal("edit")}
                onSave={handleSaveTeam}
                editData={selectedTeam}
                isEditing={true}
            />
        </div>
    );
}