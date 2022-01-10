import Link from "next/link";
import { useColorMode } from "@chakra-ui/react";
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Box,
  Flex,
  Spacer,
  IconButton,
  Text
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { FiKey } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { TiAdjustBrightness } from "react-icons/ti";
import { MdNightlightRound } from "react-icons/md";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [screenSize, setScreenSize] = useState(undefined);
  const [openMenu, setOpenMenu] = useState(true);

  useEffect(() => {
    if (typeof window != undefined) {
      const handleChange = () => setScreenSize(window.innerWidth);
      window.addEventListener("resize", handleChange);
      handleChange();
      return () => window.removeEventListener("resize", handleChange);
    }
  }, []);
  useEffect(() => {
    if (screenSize < 768) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  }, [screenSize]);
  return (
    <Flex p='2' borderBottom='1px' borderColor='gray.500' alignItems='center'>
      <Box fontSize='3xl' color='blue.800' fontWeight='bold'>
        <Link href='/'>Realtor</Link>
      </Box>
      <Spacer />
      <Box>
        {openMenu ? (
          <Flex minWidth='500px'>
            <Box cursor='pointer'>
              <Flex alignItems='center'>
                <FcHome />

                <Link href='/' passRef>
                  <Text>Home</Text>
                </Link>
              </Flex>
            </Box>
            <Spacer />
            <Box cursor='pointer'>
              <Flex alignItems='center'>
                <BsSearch />
                <Link href='/search' passRef>
                  <Text>Search</Text>
                </Link>
              </Flex>
            </Box>
            <Spacer />
            <Box cursor='pointer'>
              <Flex alignItems='center'>
                <FcAbout />
                <Link href='/search?purpose=for-sale' passRef>
                  <Text>Buy Property</Text>
                </Link>
              </Flex>
            </Box>
            <Spacer />
            <Box cursor='pointer'>
              <Flex alignItems='center'>
                <FiKey />
                <Link href='/search?purpose=for-rent' passRef>
                  <Text>Rent</Text>
                </Link>
              </Flex>
            </Box>
            <Spacer />
            <Box>
              <Flex>
                <IconButton
                  aria-label='Toggle Mode'
                  onClick={toggleColorMode}
                  isRound
                >
                  {colorMode === "light" ? (
                    <MdNightlightRound />
                  ) : (
                    <TiAdjustBrightness />
                  )}
                </IconButton>
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Box display='flex' alignItems='center'>
            <Menu style={{ zIndex: "100" }}>
              <MenuButton
                as={IconButton}
                icon={<FcMenu />}
                color='red.400'
                variant='outlined'
              />
              <MenuList>
                <Link href='/' passRef>
                  <MenuItem icon={<FcHome />}>Home</MenuItem>
                </Link>
                <Link href='/search' passRef>
                  <MenuItem icon={<BsSearch />}>Search</MenuItem>
                </Link>
                <Link href='/search?purpose=for-sale' passRef>
                  <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
                </Link>
                <Link href='/search?purpose=for-rent' passRef>
                  <MenuItem icon={<FiKey />}>Rent Home</MenuItem>
                </Link>
              </MenuList>
            </Menu>
            <Spacer />
            <Box>
              <Flex>
                <IconButton
                  aria-label='Toggle Mode'
                  onClick={toggleColorMode}
                  isRound
                >
                  {colorMode === "light" ? (
                    <MdNightlightRound />
                  ) : (
                    <TiAdjustBrightness />
                  )}
                </IconButton>
              </Flex>
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;

