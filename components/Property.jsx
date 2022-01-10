import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import millify from "millify";
import defaultImage from "../assets/images/house.jpg";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  
  return (
    <Link href={`/property/${externalID}`} passRef>
      <Flex w='420px' flexWrap='wrap' p='5' paddingTop='0' cursor='pointer'>
        <Box bg='white'>
          <Image
            src={coverPhoto ? coverPhoto?.url : defaultImage}
            width={400}
            height={260}
          />
        </Box>
        <Box w='full'>
          <Flex
            paddingTop='2'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex alignItems='center'>
              <Box paddingRight='3' color='green.400'>
                {isVerified && <GoVerified />}
              </Box>
              <Text fontSize='lg' fontWeight='bold'>
                AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
              </Text>
            </Flex>
            <Box>
              <Avatar src={agency?.logo?.url} />
            </Box>
          </Flex>
          <Flex
            alignItems='center'
            p='1'
            justifyContent='space-between'
            w='250px'
            color='blue.400'
          >
            {rooms} <FaBed /> | {baths} <FaBath />| {millify(area)} sqft{" "}
            <BsGridFill />
          </Flex>
          <Text fontSize='lg'>
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};
export default Property;
