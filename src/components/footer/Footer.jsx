import { Container, Group, rem, Badge, ActionIcon, Box } from "@mantine/core";
import { IconBrandGmail, IconBrandTwitter, IconBriefcase } from "@tabler/icons-react";
import classes from "./Footer.module.css";
import React, { useEffect, useState } from "react";

export default function Footer() {
  return (
    <Box>
      <div className={classes.footer}>
        <Container size="xl"  className={classes.inner}>
          <Badge color="blue" size="lg">
            <span className="flex flex-ai-c flex-jc-c gap10">
              <p>FirstJob</p> <IconBriefcase size="20px" />
            </span>
          </Badge>
          <Group
            gap={0}
            className={classes.links}
            justify="flex-end"
            wrap="nowrap"
          >
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandGmail
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
            Contacts: firstJob@gmail.com
          </Group>
        </Container>
      </div>
    </Box>
  );
}
