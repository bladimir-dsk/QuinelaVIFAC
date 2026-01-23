// TeamGroupsScreen_Admin.jsx
import React, { useRef, useState } from "react";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Tooltip, notification } from "antd";
import Highlighter from "react-highlight-words";
import { useApi } from "../../../../hooks/useApi";
import TeamGroupModal_Admin from "./modals/TeamGroupModal_Admin";

export default function TeamGroupsScreen_Admin() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [modalState, setModalState] = useState({
        add: false,
        edit: false,
        details: false,
    });
    const [selectedGroup, setSelectedGroup] = useState(null);

    const searchInput = useRef(null);
    const [api, contextHolder] = notification.useNotification();

    // Hook de API para grupos
    const {
        data: groupsData,
        loading: loadingGroups,
        fetchData: fetchGroups,
        deleteData: deleteGroup,
    } = useApi("/groups");

    // Hook de API para fases
    const {
        data: phasesData,
        loading: loadingPhases,
    } = useApi("/phases");

    // Hook de API para equipos
    const {
        data: teamsData,
        loading: loadingTeams,
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

    const openModal = (type, group = null) => {
        setModalState({ add: false, edit: false, details: false, [type]: true });
        setSelectedGroup(group);
    };

    const closeModal = (type) => {
        setModalState((prev) => ({ ...prev, [type]: false }));
        setSelectedGroup(null);
    };

    const handleSaveGroup = async () => {
        await fetchGroups();
        closeModal("add");
        closeModal("edit");
    };

    const handleDelete = async (record) => {
        try {
            await deleteGroup(record.id_group);
            api.success({
                title: "Grupo eliminado",
                description: `El grupo "${record.name}" ha sido eliminado correctamente`,
                placement: "topRight",
            });
        } catch (error) {
            api.error({
                title: "Error al eliminar",
                description: error.message || "No se pudo eliminar el grupo",
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
        groupsData?.map((group) => ({
            key: group.id_group,
            id_group: group.id_group,
            name: group.name,
            id_phase: group.phase?.id_phase,
            phaseName: group.phase?.name || "Sin fase",
            teams: group.teams || [],
            teamNames: group.teams?.map(team => team.name) || [],
            // Para editar: convertir teams a array de IDs como strings
            id_team: group.teams?.map(team => team.id_team.toString()) || [],
            userEmail: group.userEmail,
        })) || [];

    const columns = [
        {
            title: "Nombre del grupo",
            dataIndex: "name",
            key: "name",
            align: "center",
            ...getColumnSearchProps("name"),
            render: (name) => (
                <Tag color="blue" style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {name}
                </Tag>
            ),
        },
        {
            title: "Fase",
            dataIndex: "phaseName",
            key: "phaseName",
            align: "center",
            ...getColumnSearchProps("phaseName"),
        },
        {
            title: "Equipos",
            dataIndex: "teamNames",
            key: "teamNames",
            align: "center",
            render: (teamNames) => (
                <Space wrap>
                    {teamNames && teamNames.length > 0 ? (
                        teamNames.map((name, index) => (
                            <Tag key={index} color="green">
                                {name}
                            </Tag>
                        ))
                    ) : (
                        <Tag color="default">Sin equipos</Tag>
                    )}
                </Space>
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
                            style={{ color: "#2b7fff" }}
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
                            Grupos de equipos
                        </h1>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => openModal("add")}
                        className="bg-white text-blue-600 hover:bg-green-50 border-0 shadow-md shrink-0"
                    >
                        <span className="hidden sm:inline">Agregar Grupo</span>
                        <span className="sm:hidden">Agregar</span>
                    </Button>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loadingGroups || loadingPhases || loadingTeams}
                    scroll={{ x: "max-content" }}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} grupos`,
                    }}
                    locale={{
                        emptyText: () => {
                            if (!loadingGroups && groupsData?.length === 0) {
                                return 'No hay grupos registrados aún. Dale en "Agregar Grupo" para crear uno.';
                            }
                            return "No se encontraron grupos";
                        },
                    }}
                />
            </div>

            <TeamGroupModal_Admin
                visible={modalState.add}
                onClose={() => closeModal("add")}
                onSave={handleSaveGroup}
                isEditing={false}
                phasesData={phasesData}
                teamsData={teamsData}
            />

            <TeamGroupModal_Admin
                visible={modalState.edit}
                onClose={() => closeModal("edit")}
                onSave={handleSaveGroup}
                editData={selectedGroup}
                isEditing={true}
                phasesData={phasesData}
                teamsData={teamsData}
            />
        </div>
    );
}