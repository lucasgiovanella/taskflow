import React from "react";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

// Ícones
import { HiMiniComputerDesktop } from "react-icons/hi2";
// import { BiSpreadsheet } from "react-icons/bi";
import { RiUserSettingsFill } from "react-icons/ri";
import { TbBuildingWarehouse } from "react-icons/tb";

// Define o tipo para um item de menu
type MenuItem = Required<MenuProps>["items"][number];

// Função para criar um item de menu com chave única
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <NavLink to={`${key}`}>{label}</NavLink>,
  };
}

// Lista de itens de menu da barra lateral
export const itemsSidebar: MenuItem[] = [
  // Grupo de "Computadores" com chave para cada subitem
  getItem("Computadores", "computers-installation", <HiMiniComputerDesktop size={20} />, [
    getItem("Instalados", "computers-installation"),
    getItem("Remoções", "computers-remotion"),
    getItem("Histórico", "computers-historic"),
  ]),

  // Grupo de "Depósito" com chave para cada subitem
  getItem("Depósito", "deposit-stock", <TbBuildingWarehouse size={20} />, [
    getItem("Estoque", "deposit-stock"),
    getItem("Em Uso", "deposit-inUse"),
  ]),

  // Item individual "Exceções" com chave única
  // getItem("Exceções", "exceptions", <BiSpreadsheet size={20} />),

  // Item individual "Equipe" com chave única
  getItem("Equipe", "team", <RiUserSettingsFill size={20} />),
];
