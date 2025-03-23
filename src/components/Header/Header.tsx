import { AppBar, Box, Button, Menu, MenuItem } from "@mui/material";
import { FC, useState, MouseEvent } from "react";
import { sections, SectionType, SimpleSectionType } from "../../constant/sections.ts";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocation, useNavigate } from "react-router-dom";
import { Bar, SectionsContainer } from "./Header.styles.ts";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearAuth } from "../../utils/getAuth.ts";
import { login } from "../../constant/routes.ts";

const Header: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [subSections, setSubSections] = useState<SimpleSectionType[] | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isLogingPage = location.pathname === login;

  // Открытие выпадающего меню
  const handleClick = (event: MouseEvent<HTMLElement>, sections: SimpleSectionType[]) => {
    setSubSections(sections);
    setAnchorEl(event.currentTarget);
  };

  // Закрытие выпадающего меню и переход
  const handleNavigate = (route: string) => () => {
    navigate(route);
    setAnchorEl(null);
  };

  const parts = sections();
  const isSection = (section: SectionType) => "route" in section;

  const handleLogout = () => {
    clearAuth();
    navigate(login);
  };

  if (isLogingPage) return null;

  return (
    <AppBar position="static">
      <Bar>
        <Box
          component="img"
          src="/vite.svg"
          alt="Logo"
          sx={{
            height: 40,
          }}
        />

        <SectionsContainer>
          {parts.map((section, i) =>
            isSection(section) ? (
              <Button
                key={i}
                color="inherit"
                onClick={handleNavigate(section.route)}
                sx={{ px: 3 }}
              >
                {section.title}
              </Button>
            ) : (
              <Button
                color="inherit"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                sx={{ px: 3 }}
                key={i}
                onClick={(evt) => handleClick(evt, section.sections)}
                endIcon={<ArrowDropDownIcon />}
              >
                {section.title}
              </Button>
            )
          )}
        </SectionsContainer>

        {/* Выпадающий список */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {subSections?.map(({ route, title }) => (
            <MenuItem onClick={handleNavigate(route)}>{title}</MenuItem>
          ))}
        </Menu>

        <Button
          color="inherit"
          onClick={handleLogout}
          sx={{ px: 2, mr: 5 }}
          endIcon={<LogoutIcon />}
        >
          Выйти
        </Button>
      </Bar>
    </AppBar>
  );
};

export default Header;
