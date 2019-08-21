import React, { Component } from 'react'
import {DatePicker} from 'native-base'

class DatePick extends Component {

    render(){
        return(
            <DatePicker
                defaultDate={new Date()}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "blue" }}
                // funDate adalah function yang di kirim dari komponen AddDiaryScreen
                onDateChange={this.props.funDate}
                disabled={false}
            />
        )
    }
}

export default DatePick