import React from 'react'
import  { Card , CardContent , Typography } from '@mui/material'
/**
* @author
* @function InfoBox2
**/

export const InfoBox2 = ({title,cases,total}) => {
  return(
    <Card >
        <CardContent>
            <Typography>
                {title}
            </Typography>
            <h3>{cases}</h3>
            <Typography>
                {total ? `${total} per Million` : " "}
            </Typography>
        </CardContent>
    </Card>
   )

 }