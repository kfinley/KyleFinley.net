# ./get-aws-actions.sh "cdk deploy && cdk destroy"

#!/bin/bash -x

user_name=`aws sts get-caller-identity | jq -r '.Arn' | sed -e 's/user\// /g' | awk '{print $2}'`
sleep 5 # Sleep to avoid getting the sts call in our time range

start_time=`date`
sleep 1 # Sleep to avoid millisecond rounding issues

eval $@

sleep 1 # Sleep to avoid millisecond rounding issues
end_time=`date`

actions=""
while [ -z "$actions" ]; do
sleep 60
echo "Checking for events from $start_time to $end_time..."
actions=`aws cloudtrail lookup-events --lookup-attributes AttributeKey=Username,AttributeValue=${user_name} --start-time "${start_time}"  --end-time "${end_time}" | jq -r '.Events[].CloudTrailEvent' | jq -s | jq -r '.[] | "\(.eventSource) \(.eventName)"' | sed -e 's/.amazonaws.com /:/g' | sed -e 's/[0-9]//g' | sort | uniq`
done

echo "AWS Actions Used:"
echo "$actions"
