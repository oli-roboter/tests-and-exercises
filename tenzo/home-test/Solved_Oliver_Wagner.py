import csv
import datetime

"""
Oliver Wagner
"""

"""Aux functions cost"""

def correct_time(strTime):
    #transforms 3 to 15 
    if len(strTime) < 2: 
        pre_time = str(int(strTime) + 12)
    else:
        pre_time = strTime

    time_str = pre_time.replace(".",":").strip()

    hasAM_PM = lambda str : str.find('AM') + str.find('PM')
    hasColon = lambda str : str.find(':')
    
    if (hasAM_PM(time_str) > -1) and (hasColon(time_str)>-1):
        format = '%I:%M%p'
    elif (hasAM_PM(time_str) > -1):
        format = '%I%p'
    elif (hasColon(time_str) > -1):
        format = '%H:%M'
    else:
        format = '%H' 

    return datetime.datetime.strptime(time_str, format)
    

def get_cost_by_interval(shift_start, shift_end, break_start, break_end, cost, costs_granular):
    s_time = shift_start
    while s_time < shift_end:
        minute = s_time + datetime.timedelta(minutes=1)
        s_time += datetime.timedelta(minutes=10)
        
        if break_start < minute < break_end:
            cost_by_interval = 0
        else:
            cost_by_interval = cost/6

        fill_dict(costs_granular,str(minute), cost_by_interval)
        

def aggregate_by_hour(costs):
    costs_by_hour = {}

    for time, cost in costs.items():
        hour = str(int(time.split(' ')[1].split(":")[0])) + ':00'
        fill_dict(costs_by_hour, hour, cost)
    
    return costs_by_hour

"""aux functions general"""

def fill_dict(dict, key, value):
    if dict.get(key) is None:
        dict[key] = value
    elif value == 0:
        pass
    else:
        upd_value = dict[key] + value
        dict[key] = upd_value

def handle_empty_key(key, dict):
    if dict.get(key) is None:
        return 0
    else:
        return dict[key]

def printer(dict):
    for time, value in dict.items():
        print(str(time) + ':' + str(value))


"""END of Aux functions"""

def process_shifts(path_to_csv): 
    """
    :param path_to_csv: The path to the work_shift.csv
    :type string:
    :return: A dictionary with time as key (string) with format %H:%M
        (e.g. "18:00") and cost as value (Number)
    For example, it should be something like :
    {
        "17:00": 50,
        "22:00: 40,
    }
    In other words, for the hour beginning at 17:00, labour cost was
    50 pounds
    :rtype dict:
    """
    costs_granular = {}
    with open(path_to_csv) as csv_file:    
        csv_reader = csv.reader(csv_file, delimiter=',')
        for shift_data in csv_reader:
            if shift_data[0] == 'break_notes': continue
            break_start = correct_time(shift_data[0].split("-")[0])
            break_end = correct_time(shift_data[0].split("-")[1])
            shift_start = correct_time(shift_data[3])
            shift_end = correct_time(shift_data[1])
            cost = float(shift_data[2])

            get_cost_by_interval(shift_start, shift_end, break_start, break_end, cost, costs_granular)
    return aggregate_by_hour(costs_granular)


def process_sales(path_to_csv):            
    """
    :param path_to_csv: The path to the transactions.csv
    :type string:
    :return: A dictionary with time (string) with format %H:%M as key and
    sales as value (string),
    and corresponding value with format %H:%M (e.g. "18:00"),
    and type float)
    For example, it should be something like :
    {
        "17:00": 250,
        "22:00": 0,
    },
    This means, for the hour beginning at 17:00, the sales were 250 dollars
    and for the hour beginning at 22:00, the sales were 0.

    :rtype dict:
    """
    sales = {}
    with open(path_to_csv) as csv_file:    
        csv_reader = csv.reader(csv_file, delimiter=',')
        for sale in csv_reader:
            if sale[0] == 'amount':continue
            sale_value = float(sale[0])
            sale_time = str(sale[1].split(":")[0]) + ":00"     
            fill_dict(sales, sale_time, sale_value)
    return sales

def compute_percentage(cost, revenue):
    """
    :param shifts:
    :type shifts: dict
    :param sales:
    :type sales: dict
    :return: A dictionary with time as key (string) with format %H:%M and
    percentage of labour cost per sales as value (float),
    If the sales are null, then return -cost instead of percentage
    For example, it should be something like :
    {
        "17:00": 20,
        "22:00": -40,
    }
    :rtype: dict
    """
    profits = {}

    for time,cost in cost.items():
        profit = handle_empty_key(time, revenue) - cost
        if profit > 0:
            percentage = round(cost/revenue[time] * 100)
        else:
            percentage = round(profit)

        profits[time] = percentage
    
    return profits


def best_and_worst_hour(percentages):
    """
    Args:
    percentages: output of compute_percentage
    Return: list of strings, the first element should be the best hour,
    the second (and last) element should be the worst hour. Hour are
    represented by string with format %H:%M
    e.g. ["18:00", "20:00"]

    """
    
    only_profits = {k:v for k,v in percentages.items() if v>0}
    maxProfit = min(only_profits.keys(), key = (lambda k:only_profits[k]))
    minProfit = min(percentages.keys(), key = (lambda k:percentages[k]))

    return [maxProfit, minProfit]

def main(path_to_shifts, path_to_sales):
    """
    Do not touch this function, but you can look at it, to have an idea of
    how your data should interact with each other
    

    shifts_processed = process_shifts(path_to_shifts)
    sales_processed = process_sales(path_to_sales)
    percentages = compute_percentage(shifts_processed, sales_processed)
    best_hour, worst_hour = best_and_worst_hour(percentages)
    return best_hour, worst_hour
"""

if __name__ == '__main__':
    # You can change this to test your code, it will not be used
    path_to_sales = "./transactions.csv"
    path_to_shifts = "./work_shifts.csv"
    shifts_processed = process_shifts(path_to_shifts)
    sales_processed = process_sales(path_to_sales)
    percentages = compute_percentage(shifts_processed, sales_processed)
    best_hour, worst_hour = best_and_worst_hour(percentages)

    # printer(shifts_processed)
    # printer(sales_processed)
    # printer(percentages)
    # print(best_hour, worst_hour)
    


# Oliver Wagner
