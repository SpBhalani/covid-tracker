import React from 'react'
import  { Card , CardContent , Typography } from '@mui/material'
/**
* @author
* @function InfoBox
**/

export const InfoBox = ({title,cases,total}) => {
  return(
    <Card >
        <CardContent>
            <Typography>
                {title}
            </Typography>
            <h3>{cases}</h3>
            <Typography>
                {total} total
            </Typography>
        </CardContent>
    </Card>
   )

 }