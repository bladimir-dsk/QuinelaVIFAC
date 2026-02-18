import React, { useRef, useState } from "react";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Tooltip, notification } from "antd";
import Highlighter from "react-highlight-words";
import dayjs from 'dayjs';
import { useApi } from "../../../hooks/useApi";
import MatchModal_Admin from "./modals/MatchModal_Admin";
import WinnerModal_Admin from "./modals/WinnerModal_Admin";
import { useDeleteConfirmation } from "../../../hooks/useDeleteConfirmation";
import { Crown } from "lucide-react";

export default function MatchesRegistrationScreen_Admin() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [modalState, setModalState] = useState({
        add: false,
        edit: false,
        winner: false,
    });
    const [selectedMatch, setSelectedMatch] = useState(null);

    const searchInput = useRef(null);
    const [api, contextHolder] = notification.useNotification();

    // Hook de API para partidos
    const {
        data: matchesData,
        loading: loadingMatches,
        fetchData: fetchMatches,
        deleteData: deleteMatch,
    } = useApi("/matches");

    // Hook de API para fases
    const {
        data: phasesData,
        loading: loadingPhases,
    } = useApi("/phases");

    // Hook de API para grupos
    const {
        data: groupsData,
        loading: loadingGroups,
    } = useApi("/groups");

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

    const openModal = (type, match = null) => {
        setModalState({ add: false, edit: false, winner: false, [type]: true });
        setSelectedMatch(match);
    };

    const closeModal = (type) => {
        setModalState((prev) => ({ ...prev, [type]: false }));
        setSelectedMatch(null);
    };

    const handleSaveMatch = async () => {
        await fetchMatches();
        closeModal("add");
        closeModal("edit");
    };

    const handleSaveWinner = async () => {
        await fetchMatches();
        closeModal("winner");
    };

    const showDeleteConfirm = useDeleteConfirmation({
        onDelete: deleteMatch,
    });

    const handleDelete = (record) => {
        showDeleteConfirm({
            title: '¿Estás seguro de eliminar este partido?',
            content: `Se eliminará el partido entre ${record.teamA?.name} vs ${record.teamB?.name} y esta acción no se podrá deshacer.`,
            entityName: 'el partido',
            recordId: record.id_match,
            successTitle: 'Partido eliminado',
            successDescription: 'El partido ha sido eliminado correctamente',
        });
    };

    const handleEdit = (record) => {
        openModal("edit", record);
    };

    const handleSetWinner = (record) => {
        openModal("winner", record);
    };

    // Transformar datos para la tabla
    const dataSource =
        matchesData?.map((match) => ({
            key: match.id_match,
            id_match: match.id_match,
            matchDate: match.matchDate,
            matchDateFormatted: dayjs(match.matchDate).format('DD MMM YYYY h:mm a'),
            isFinished: match.isFinished,
            phase: match.phase,
            group: match.group,
            teamA: match.teamA,
            teamB: match.teamB,
            winner: match.winner,
            userEmail: match.userEmail,
        })) || [];

    const columns = [
        {
            title: "Equipo A",
            key: "teamA",
            align: "center",
            render: (_, record) => (
                <Space>
                    <img
                        src={record.teamA?.flagUrl}
                        alt={record.teamA?.name}
                        style={{ width: 24, height: 18 }}
                    />
                    <span className="font-semibold">{record.teamA?.name}</span>
                </Space>
            ),
        },
        {
            title: "VS",
            key: "vs",
            align: "center",
            width: 50,
            render: () => (
                <Tag color="red" style={{ fontSize: "12px", fontWeight: "bold" }}>
                    VS
                </Tag>
            ),
        },
        {
            title: "Equipo B",
            key: "teamB",
            align: "center",
            render: (_, record) => (
                <Space>
                    <img
                        src={record.teamB?.flagUrl}
                        alt={record.teamB?.name}
                        style={{ width: 24, height: 18 }}
                    />
                    <span className="font-semibold">{record.teamB?.name}</span>
                </Space>
            ),
        },
        {
            title: "Fase",
            dataIndex: ["phase", "name"],
            key: "phaseName",
            align: "center",
            ...getColumnSearchProps("phase"),
            render: (name) => (
                <Tag color="purple" style={{ fontSize: "13px" }}>
                    {name || "Sin fase"}
                </Tag>
            ),
        },
        {
            title: "Grupo",
            dataIndex: ["group", "name"],
            key: "groupName",
            align: "center",
            ...getColumnSearchProps("group"),
            render: (name) => (
                <Tag color="blue" style={{ fontSize: "13px" }}>
                    {name || "Sin grupo"}
                </Tag>
            ),
        },
        {
            title: "Fecha y Hora",
            dataIndex: "matchDateFormatted",
            key: "matchDate",
            align: "center",
            render: (date) => (
                <Space>
                    <span>{date}</span>
                </Space>
            ),
        },
        {
            title: "Estado",
            dataIndex: "isFinished",
            key: "isFinished",
            align: "center",
            filters: [
                { text: "Finalizado", value: true },
                { text: "Pendiente", value: false },
            ],
            onFilter: (value, record) => record.isFinished === value,
            render: (isFinished) => (
                <Tag color={isFinished ? "green" : "orange"}>
                    {isFinished ? "Finalizado" : "Pendiente"}
                </Tag>
            ),
        },
        {
            title: "Acciones",
            key: "acciones",
            align: "center",
            width: 120,
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Asignar ganador" color="blue">
                        <Button 
                            type="link"
                            icon={<Crown size={16} />}
                            onClick={() => handleSetWinner(record)}
                        />
                    </Tooltip>
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
                            Registro de partidos
                        </h1>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => openModal("add")}
                        className="bg-white text-green-600 hover:bg-green-50 border-0 shadow-md shrink-0"
                    >
                        <span className="hidden sm:inline">Agregar Partido</span>
                        <span className="sm:hidden">Agregar</span>
                    </Button>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-lg dark:bg-[#141414] shadow-sm p-4">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loadingMatches || loadingPhases}
                    scroll={{ x: "max-content" }}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} partidos`,
                    }}
                    locale={{
                        emptyText: () => {
                            if (!loadingMatches && matchesData?.length === 0) {
                                return 'No hay partidos registrados aún. Dale en "Agregar Partido" para crear uno.';
                            }
                            return "No se encontraron partidos";
                        },
                    }}
                />
            </div>

            <MatchModal_Admin
                visible={modalState.add}
                onClose={() => closeModal("add")}
                onSave={handleSaveMatch}
                isEditing={false}
                phasesData={phasesData}
                groupsData={groupsData}
            />

            <MatchModal_Admin
                visible={modalState.edit}
                onClose={() => closeModal("edit")}
                onSave={handleSaveMatch}
                editData={selectedMatch}
                isEditing={true}
                phasesData={phasesData}
                groupsData={groupsData}
            />

            <WinnerModal_Admin
                visible={modalState.winner}
                onClose={() => closeModal("winner")}
                onSave={handleSaveWinner}
                matchData={selectedMatch}
            />
        </div>
    );
}