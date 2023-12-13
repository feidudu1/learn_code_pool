from torchvision import transforms
from torch.utils.data import DataLoader, Dataset
import os
# 跟openCV很像
from PIL import Image
import numpy as np
import glob

label_name = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]

label_dict = {}

for idx, name in enumerate(label_name):
    label_dict[name] = idx

def default_loader(path):
    return Image.open(path).convert("RGB")

# 训练集的数据增强
train_transform = transforms.Compose([
    transforms.RandomResizedCrop((28, 28)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.RandomRotation(90), # 角度在90到-90
    transforms.RandomGrayscale(0.1),
    transforms.ColorJitter(0.3, 0.3, 0.3, 0.3), # 颜色增强
    transforms.ToTensor()
])

class MyDataset(Dataset):
    def __init__(self, im_list,
                 transform=None,
                 loader = default_loader):
        super(MyDataset, self).__init__()
        imgs = []

        for im_item in im_list:
            #"./pytorch入门到进阶/home/dataset/cifar-10-batches-py/train/" \
            #"airplane/aeroplane_s_000021.png"
            im_label_name = im_item.split("/")[-2]
            imgs.append([im_item, label_dict[im_label_name]])

        self.imgs = imgs
        self.transform = transform
        self.loader = loader

    def __getitem__(self, index):
        im_path, im_label = self.imgs[index]
        im_data = self.loader(im_path)
        if self.transform is not None:
            im_data = self.transform(im_data)
        return im_data, im_label

    def __len__(self):
        return len(self.imgs)

im_train_list = glob.glob("./pytorch入门到进阶/home/dataset/cifar-10-batches-py/train/*/*.png")
im_test_list = glob.glob("./pytorch入门到进阶/home/dataset/cifar-10-batches-py/test/*/*.png")

train_dataset = MyDataset(im_train_list,
                         transform=train_transform)
# 不对测试集做数据增强
test_dataset = MyDataset(im_test_list,
                        transform =transforms.ToTensor())

train_loader = DataLoader(dataset=train_dataset,
                               batch_size=6,
                               shuffle=True,
                               num_workers=4)

test_loader = DataLoader(dataset=test_dataset,
                               batch_size=6,
                               shuffle=True,
                               num_workers=4)

print("num_of_train", len(train_dataset))
print("num_of_test", len(test_dataset))









