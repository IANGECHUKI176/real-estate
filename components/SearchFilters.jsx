import { useEffect, useState } from "react";
import {
  Select,
  Box,
  Text,
  Icon,
  Flex,
  Input,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchData } from "../utils/fetchApi";
const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValues);
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query });
  };
  // useEffect(() => {
  //   if (searchTerm != "") {
  //     const fetchData = async () => {
  //       setLoading(true);
  //       const places = await fetchData(`${baseUrl}/autocomplete?query=${searchTerm}`);
  //       setLoading(false);
  //       console.log(places);
  //     };
  //     fetchData();
  //   }
  // }, [searchTerm]);
  return (
    <Flex bg='gray.300' justifyContent='center' flexWrap='wrap' p='4'>
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            w='fit-content'
            p='2'
            fontWeight='black'
          >
            {filter?.items?.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDirection='column'>
        <Button
          onClick={() => setShowLocations(!showLocations)}
          marginTop='5px'
          border='1px'
          borderColor='gray.400'
        >
          Search Location
        </Button>
        {showLocations && (
          <Flex position='relative' paddingTop='2' alignItems='center'>
            <Input
              w='300px'
              focusBorderColor='gray.500'
              placeholder='Search Locations'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm != "" && (
              <Icon
                as={MdCancel}
                cursor='pointer'
                onClick={() => setSearchTerm("")}
                position='absolute'
                right='5'
                top='5'
                zIndex='100'
              />
            )}
            {loading && <Spinner />}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
export default SearchFilters;
